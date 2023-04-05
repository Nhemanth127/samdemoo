const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const BuyingCircle = require("../models/BuyingCircleModel");
const BuyingCircleMembersModel = require("../models/BuyingCircleMembersModel");
const SellingCircle = require("../models/SellingCircleModel");
const SellingCircleMembersModel = require("../models/SellingCircleMembersModel");
const Product=require("../models/productModel")

exports.isSAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("in isSa");
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  user = await SellingCircleMembersModel.findById(decodedData.id);
  // console.log("out");
  req.user=user
  if(!user){
    return next(new ErrorHander("you are not Authorized to use this service!"))
  }
  next();
});
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await BuyingCircleMembersModel.findById(decodedData.id);

  next();
});

exports.isSAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // const circle=await BuyingCircle.findById(decodedData.id);
  // console.log(circle);
  req.circle =await SellingCircle.findById(decodedData.id);
  if(!req.circle){
      return next(new ErrorHander("You are not admin, To avail this service", 401));
  }

  // here some work need to be done clash bw adding circle member and getting detail and removing menber
  // if(req.circle.circlename!=req.body.circlename || req.circle.circleemail!=req.body.circleemail ){
  //     return next(new ErrorHander("You can only process your circle members data!!", 401));
  // }
  next();
});

exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // const circle=await BuyingCircle.findById(decodedData.id);
  // console.log(circle);
  req.circle =await BuyingCircle.findById(decodedData.id);
  if(!req.circle){
      return next(new ErrorHander("You are not admin, To avail this service", 401));
  }
  if(req.circle.circlename!=req.body.circlename || req.circle.circleemail!=req.body.circleemail ){
    return next(new ErrorHander("You can only process your circle members data!!", 401));
}
  next();
});


exports.isSameUser=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.params.id)
  if(!product){
    return next(new ErrorHander("No product found! wrong id entered."))
  }
  // console.log("1- ", product.user);
  // console.log("2- ",req.user._id);
  // console.log(typeof(product.user));
  // console.log(product.user.equals(req.user._id));
  if(!product.user.equals(req.user._id)){
    return next(new ErrorHander("you can't alter other seller's product!!"))
  }
  next();
})
