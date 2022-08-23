![image](https://user-images.githubusercontent.com/105031842/182522359-499bd4b5-7b95-48e5-b7f5-78099f885189.png)


## 🐶 Petsitt 둘러보기
- 사이트 바로가기 : https://petsitt.link/

<br>


## 😃 PetSitt 소개
반려견을 특정 기간 동안 맡길수 있는 돌보미와 사용자를 연결해 주는 중계 서비스입니다.\
내가 검색한 지역, 조건에 맞는 돌보미의 정보를 제공하고,\
예약시스템을 통해 돌보미와 연결해주는 기능을 제공합니다.

## ⏰개발기간
2022년 6월 24일 ~ 2022년 8월 5일(6주)


## ⚒️ BE개발 스택
![](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
![](https://img.shields.io/badge/socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)\
![](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![](https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

## 📖 라이브러리 [- 선정 이유](https://delightful-canvas-f42.notion.site/6ab5a567aad24a1299e613942fd08389)

라이브러리 | 설명
---|:---:
<img src='https://img.shields.io/badge/bcrypt-5.0.1-lightgrey'> 
<img src='https://img.shields.io/badge/cors-2.8.5-lightgrey'>
<img src='https://img.shields.io/badge/dotenv-16.0.1-lightgrey'> 
<img src='https://img.shields.io/badge/express-4.18.1-lightgrey'> 
<img src='https://img.shields.io/badge/helmet-4.6.0-lightgrey'>  
<img src='https://img.shields.io/badge/joi-17.6.0-lightgrey'>  
<img src='https://img.shields.io/badge/jsonwebtoken-8.5.1-lightgrey'>  
<img src='https://img.shields.io/badge/moment-2.29.3-lightgrey'> 
<img src='https://img.shields.io/badge/mysql-2.18.1-lightgrey'> 
<img src='https://img.shields.io/badge/sequelize-6.21.3-lightgrey'>  
<img src='https://img.shields.io/badge/sequelize--cli-6.4.1-lightgrey'> 
<img src='https://img.shields.io/badge/multer-1.4.5--lts.1-lightgrey'> 
<img src='https://img.shields.io/badge/multer--s3-2.10.0-lightgrey'> 
<img src='https://img.shields.io/badge/multer--s3--transform-2.4.2-lightgrey'> 
<img src='https://img.shields.io/badge/sharp-0.30.7-lightgrey'> 
<img src='https://img.shields.io/badge/nodemailer-6.7.6-lightgrey'> 
<img src='https://img.shields.io/badge/socket.io-4.5.1-lightgrey'> 


<br>

## 📂 [Project Notion - 통합요약본](https://www.notion.so/62309f0a306b44c494fe560ded17ecff)
## 📂 [Project Notion - API작성문서](https://alike-gasosaurus-a29.notion.site/1-1dfc5a2fcf794052acdc2f1805b6ecde)

<br>


## 🖊 서비스의 주요기능

#### ✅  **실시간 위치 정보 및 지도 (kakao Map API)를 활용한 돌보미 리스트 표기**
- 펫싯에 접속한 사용자의 실시간 위치 정보를 얻어와 근처의 돌보미 리스트를 보여줌
- 혹은 사용자가 검색한 주소 기준으로 가까운 곳에 위치한 돌보미 리스트 확인 가능
- 카카오 맵에서 돌보미 마커 선택 시, 해당 돌보미의 이름과 평점을 간단히 보여주고 돌보미 정보 카드를 클릭할 경우 해당 돌보미의 상세 페이지로 이동

#### ✅  **돌보미와 고객간의 실시간 채팅 (Socket.io)**
- 각 시터에 해당된 채팅방 생성
- 채팅창 상단에 위치 시, 새로운 채팅메세지를 스크롤다운 없이 확인가능

#### ✅  **실시간 알림 (SSE)**
- 채팅방에 접속해있지 않거나, 새로 사이트에 로그인 했을 경우 새로운 알림 아이콘 표시
    - 로그인 중 새로운 메시지를 전송받았을 경우
    - 펫싯 사이트에 접속해있지 않다가 다시 로그인 했을 때 새로운 메세지가 있는 경우


## 🏗Service Architecture
![KakaoTalk_20220802_180108489](https://user-images.githubusercontent.com/75964402/182356945-32fd49ef-c3ce-4e74-8161-dcfdd0b17890.png)


## ⚒️ ERD
<img width="875" alt="Screen Shot 2022-08-02 at 6 15 07 AM" src="https://user-images.githubusercontent.com/104882862/182362019-c9b7b365-c66e-4932-b6e6-cebeda864d97.png">
