import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors';
import jwt from 'jsonwebtoken';
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://yuvrajgangwar:t8B4otz0LL5ImBGs@fullstackprojects.4p96yrc.mongodb.net/?retryWrites=true&w=majority&appName=FullstackProjects",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    userType:String,
});
const Collection = new mongoose.model("users",userSchema);

app.post("/authLogin",async(req,res)=>{
    const {username, password,userType} = req.body;
    const userPresent = await Collection.findOne(username);
    if(!userPresent){
        return res.json({code:404 ,message:"User Doesnt Exists"});
    }
    if(password!==userPresent.password){
        return res.json({code:401 ,message:"Password Doesnt Match"});
    }
    const token = jwt.sign({id:userPresent._id},"secret");
    res.json({token,userID:userPresent._id}); 
});
app.get("/apiCheck",(req,res)=>{
    res.send({data:"edeefewfe"});
})
app.post("/authSignup",async(req,res)=>{
    const {username,password,userType} = req.body;
    const userPresent = await Collection.findOne(username);
    if(!userPresent){
        return res.json({code:403,message:"User already Exists"})
    }
    let users = new Collection();
    await users.save();
    res.json({code:200, message:"Registratio Successfully Completed"});
});
app.listen(3000,()=>{
    console.log("Dont Touch ,its Still Alive ");
})