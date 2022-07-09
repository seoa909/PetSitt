const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { //사용자
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  sitterId: { //돌보미
    type: String,
    required: true,
  },
  imageUrl: {  //시터쪽 이미지
    type: String,
    default: ""
  },
  reviewStar: {
    type: Number,
    required: true,
  },
  reviewInfo: { //1000글자 제한
    type: String,
    required: true,
  },
  reviewDate: {
    type: Date,
    default: new Date(),
    required: true,
  }
});

reviewSchema.virtual("reviewId").get(function () {
  return this._id.toHexString();
});
reviewSchema.set("toJSON", {
  virtuals: true,
});
module.exports = { Review: mongoose.model("Review", reviewSchema) };