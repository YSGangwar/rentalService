import mongoose  from "mongoose";
export const car = {
    carName:String,
    carPrice:String,
    carType:String,
    carImg:String,
};
const sellerSchema = new mongoose.Schema({
    username:String,
    carsOnRent:[
        car
    ],
    myCars: [
        car
    ]
});
const sellerModel = new mongoose.model("seller",sellerSchema);
export default sellerModel;