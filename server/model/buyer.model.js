import mongoose from "mongoose";
const car = {
    carName:String,
    carPrice:String,
    carType:String,
    carImg:String,
};
const buyerSchema = new mongoose.Schema({
    username:String,
    rentedCars:[
        car
    ]
});
const buyerModel = new mongoose.model("buyers",buyerSchema);
export default buyerModel;