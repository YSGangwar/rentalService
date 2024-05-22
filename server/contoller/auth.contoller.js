import { UserModel, sellerModel, buyerModel} from '../model/index.js'
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import jwt from 'jsonwebtoken';
const getRentedCars=async ( req,res)=>{
  const {username} = req.body;
  const buyer = await buyerModel.findOne({ username });
      
  if (!buyer) {
      return res.status(404).json({ message: 'NO Cars To show'});
  }
  
  return res.status(200).json(buyer.rentedCars);

};

const addRentedCars = async ( req,res) =>{
  const { username , carsData } = req.body || {};
	console.log("TCL: addRentedCars -> carsData", carsData)
  const buyer = await buyerModel.findOne({username});
  if(!buyer){
    return res.status(404).json({ message: 'Buyer not found' });
  }
  
  buyer.rentedCars.push(carsData);
  await buyer.save();
  return res.status(200).json({ message: 'Cars added successfully', buyer });
}

const signUp = async (req, res) => {
  const { username, password, userType } = req.body  || {};
  const userPresent = await UserModel.findOne({ username });
  if (userPresent) {
    return res.json({ code: 403, message: "User already Exists" });
  }
  if(userType === "buyer"){
    let buyers = new buyerModel();
    buyers.username = req.body.username;
    await buyers.save();
  }
  let users = new UserModel();
  users.username = req.body?.username;
  users.password = req.body?.password;
  users.userType = req.body.userType;
  await users.save();
  return res.json({ code: 200, message: "Registratio Successfully Completed" });
};
const login = async (req, res)=>{
  const {username, password,userType} = req.body;
    const userPresent = await UserModel.findOne({username});
    if(!userPresent){
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    if(password!==userPresent.password){
        return res.json({code:401 ,message:"Password Doesnt Match"});
    }
    if(userType!==userPresent.userType){
        return res.json({code:402 ,message:"User Type  Doesnt Match"});

    }
    const token = jwt.sign({id:userPresent._id},"secret");
    return res.json({token,userID:userPresent._id}); 
}

export default {signUp,login, getRentedCars,addRentedCars};
