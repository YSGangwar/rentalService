import mongoose  from "mongoose";
export const car = {
    carName:String,
    carPrice:String,
    carType:String,
    carImg:String,
};
export const carNew ={
    buyername:String,
    carName:String,
    carPrice:String,
    carType:String,
    carImg:String,
}
const sellerSchema = new mongoose.Schema({
    username:String,
    carsOnRent:[
        carNew
    ],
    myCars: [
        car
    ]
});
const sellerModel = new mongoose.model("seller",sellerSchema);
export default sellerModel;