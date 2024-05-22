import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    userType:String,
});
const UserModel = new mongoose.model("User",userSchema);
export default UserModel;