import { UserModel, sellerModel, buyerModel } from "../model/index.js";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import jwt from "jsonwebtoken";


const soldCars = async (req, res) =>{
  const {username} = req.body || {};
  const seller = await sellerModel.findOne({ username });

  if (!seller) {
    return res.status(404).json({ message: "NO Cars To show" });
  }

  return res.status(200).json(seller.carsOnRent);

}

const addCarsOnRentABC = async ( req , res ) => {
  const {buyerUsername ,incomingUsername , sellerUsername , carsData} = req.body || {};
  const username = sellerUsername;
  console.log(incomingUsername);
  const sellerData = await sellerModel.findOne({username });


  const buyerCars  = await buyerModel.findOne({username:incomingUsername});
  if(!buyerCars){
    return res.status(404).json("No Buyer Found");
  }
  carsData.sellername = sellerUsername;
  buyerCars.rentedCars.push(carsData);
  await buyerCars.save();
  
  if(!sellerData ){
    return res.status(404).json("No users Found");
  }
  carsData.buyername=buyerUsername;
  sellerData.carsOnRent.push(carsData);
  await sellerData.save();


  return res.status(200).json("Carr Added");
};

const addbuyerRentedCarsABC = async ( req,res) =>{
  let { username , sellerUsername ,carsData} = req.body || {};
  const buyerCars  = await buyerModel.findOne({username});
  if(!buyerCars){
    return res.status(404).json("No Buyer Found");
  }
  carsData.sellername = sellerUsername;
  buyerCars.rentedCars.push(carsData);
  await buyerCars.save();
  return res.status(200).json("Added Succesfully");
}


const sellerCarsData = async (req, res) => {
  const sellerAllData = await sellerModel.find();
  return res.status(200).json(sellerAllData);
};
const getMyCars = async (req, res) => {
  const { username } = req.body || {};
  const allCars = await sellerModel.findOne({ username });
  if (!allCars) {
    return res.status(404).json({ message: "NO Cars To show" });
  }
  return res.status(200).json(allCars.myCars);
};

const getRentedCars = async (req, res) => {
  const { username } = req.body || {};
  const buyer = await buyerModel.findOne({ username });

  if (!buyer) {
    return res.status(404).json({ message: "NO Cars To show" });
  }

  return res.status(200).json(buyer.rentedCars);
};

const addRentedCars = async (req, res) => {
  const { username, carsData } = req.body || {};
  const buyer = await sellerModel.findOne({ username });
  if (!buyer) {
    return res.status(404).json({ message: "Seller not found" });
  }

  buyer.myCars.push(carsData);
  await buyer.save();
  return res.status(200).json({ message: "Cars added successfully", buyer });
};

const signUp = async (req, res) => {
  const { username, password, userType } = req.body || {};
  const userPresent = await UserModel.findOne({ username });
  if (userPresent) {
    return res.json({ code: 403, message: "User already Exists" });
  }
  if (userType === "buyer") {
    let buyers = new buyerModel();
    buyers.username = req.body.username;
    await buyers.save();
  }
  if (userType === "seller") {
    let selles = new sellerModel();
    selles.username = req.body.username;
    await selles.save();
  }
  let users = new UserModel();
  users.username = req.body?.username;
  users.password = req.body?.password;
  users.userType = req.body.userType;
  await users.save();
  return res.json({ code: 200, message: "Registratio Successfully Completed" });
};
const login = async (req, res) => {
  const { username, password, userType } = req.body;
  const userPresent = await UserModel.findOne({ username });
  if (!userPresent) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
  if (password !== userPresent.password) {
    return res.json({ code: 401, message: "Password Doesnt Match" });
  }
  if (userType !== userPresent.userType) {
    return res.json({ code: 402, message: "User Type  Doesnt Match" });
  }
  const token = jwt.sign({ id: userPresent._id }, "secret");
  return res.json({ token, userID: userPresent._id });
};

export default {
  addbuyerRentedCarsABC,
  addCarsOnRentABC,
  signUp,
  login,
  getRentedCars,
  addRentedCars,
  getMyCars,
  sellerCarsData,
  soldCars,
};
