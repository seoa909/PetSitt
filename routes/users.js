const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authMiddleware = require('../middlewares/auth-middleware');
const bcrypt = require('bcrypt');
const mailer = require('../mail/passwordEmail');
require('dotenv').config();


//signup 회원가입
router.post('/signup', async (req, res) => {
  try {
    const { userEmail, userName, password, phoneNumber } = req.body;
    const refreshToken = '';
    //userEmail ot phoneNumber 중복확인
    if (userEmail && userName && password && phoneNumber === '') {
      res.status(400).send({ errorMessage: '필수 항목을 모두 입력해주세요!' });
    }
    const existUserEmail = await User.findOne({
      where: { userEmail: userEmail },
    });
    if (existUserEmail) {
      return res
        .status(400)
        .send({ errorMessage: '이미 가입된 이메일 주소 입니다.' });
    }
    const existPhoneNumber = await User.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (existPhoneNumber) {
      return res
        .status(400)
        .send({ errorMessage: '이미 가입된 핸드폰 번호 입니다!' });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({
      userEmail,
      userName,
      password: hashPassword,
      phoneNumber,
      refreshToken,
    });
    res.status(201).json({ message: '회원가입이 완료되었습니다!' });
  } catch {
    res.status(400).send({
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
});

// login 로그인
router.post('/login', async (req, res) => {
  try {
    const { userEmail, password } = await req.body;
    const user = await User.findOne({ where: { userEmail: userEmail } });
    if (!user) {
      res.status(400).send({
        errorMessage: '가입된 이메일 주소가 아닙니다 다시 확인해주세요.',
      });
      return;
    }
    if (user) {
      let passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: '비밀번호를 다시 확인해주세요!',
        });
      }
    }
    const accessToken = jwt.sign(
      {
        userEmail: user.userEmail,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '300m',
      }
    );
    const refreshToken = jwt.sign(
      {
        userEmail: user.userEmail,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '10d',
      }
    );

    await user.update(
      { refreshToken },
      { where: { userEmail: user.userEmail } }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.status(200).send({
      message: '로그인 성공',
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).send({
      message: '이메일 또는 비밀번호를 확인해주세요 ',
    });
  }
});

//refreshToken check 리프레시 토큰 확인 / accessToken 재발급
router.post('/refresh', (req, res) => {
  // Destructuring refreshToken from cookie
  const refreshToken = req.body.refreshToken;
  if (refreshToken === undefined) {
    return res.status(401).json({ errorMessage: '리프레쉬 토큰이 없습니다.' });
  }

  // Verifying refresh token
  if (req.body) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: '리프레시 토큰 오류' });
      } else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(
          { userEmail: user.userEmail },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '100m',
          }
        );
        return res.json({
          ok: true,
          message: 'accessToken 재발급 성공!',
          accessToken: accessToken,
        });
      }
    });
  } else {
    return res.status(406).json({ message: '토큰 발급 불가' });
  }
});

//id_check  유저 아이디찾기
router.post('/id_check', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (phoneNumber === undefined) {
      res.status(400).send({
        errorMessage: '핸드폰 번호를 다시 확인해주세요.',
      });
      return;
    }
    const user = await User.findOne({ where: { phoneNumber: phoneNumber } });

    if (!user) {
      res.status(406).send({ errorMessage: '가입시 사용된 핸드폰 번호가 아닙니다.' });
      return;
    } else {
      return res
        .status(200)
        .send({ message: '가입시 사용된 이메일 주소 입니다!', userEmail: user.userEmail });
    }
  } catch (err) {
    res.status(400).json({ errorMessage: 'fail' });
  }
});

//password check  유저 비밀번호 찾기
router.post('/password_check', async (req, res) => {
  const { userEmail } = req.body;
  try {
    if (userEmail === undefined) {
      res.status(400).send({
        errorMessage: '이메일을 다시 확인해 주세요.',
      });
      return;
    }
    const user = await User.findOne({ where: { userEmail } });

    if (!user) {
      res.status(406).send({ errorMessage: '존재하지 않는 이메일입니다' });
      return;
    }
    // 새 비밀번호 (암호화)
    const randomPassword = String(Math.floor(Math.random() * 1000000) + 100000);
    const hashPassword = await bcrypt.hash(randomPassword, 10);
    await user.update(
      { password: hashPassword },
      { where: { userEmail: userEmail } }
    );
    let emailParam = {
      toEmail: userEmail, // 수신할 이메일
      subject: 'petsitter 임시 비밀번호 메일발송', // 메일 제목
      text: `${user.userName} 회원님! 임시 비밀번호는 ${randomPassword} 입니다`, // 메일 내용
    };

    mailer.sendGmail(emailParam);
    res.send({ result: true });
  } catch (err) {
    res.status(400).json({ errorMessage: 'fail' });
  }
});

//user_info_check 유저정보조회
router.get('/auth', authMiddleware, (req, res) => {
  try {
    const { user } = res.locals;
    res.status(200).send({
      user,
    });
  } catch {
    res.status(401).send({
      errormessage: '사용자 정보를 가져오지 못하였습니다.',
    });
  }
});

//kakao login  소셜로그인
router.post('/auth/kakao', async (req, res) => {
  const { userEmail, userName } = req.body;

  const existsUsers = await User.findOne({ where: { userEmail: userEmail } });

  if (existsUsers) {
    // 이미 해당 이메일이 DB에 있는 경우 DB에 new User로 새로 테이블을 만들어주지 않고 토큰만 보내준다.
    return res.send({
      result: true,
      token: jwt.sign(
        { userEmail: existsUsers.userEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '6h' }
      ),
    });
  } else {
    const user = await User.create({
      userEmail,
      userName,
    });
    return res.send({
      result: true,
      token: jwt.sign(
        { userEmail: user.userEmail },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '6h' }
      ),
    });
  }
  // await user.save();
});

module.exports = router;
