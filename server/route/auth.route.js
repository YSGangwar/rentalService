import express from 'express'
import {authContoller} from '../contoller/index.js';
const router = express.Router()
router.post("/signup", authContoller.signUp);
router.post("/login", authContoller.login);
router.post("/getRentedCars",authContoller.getRentedCars);
router.post("/addRentedCars",authContoller.addRentedCars);
router.post("/getMyCars",authContoller.getMyCars);
router.get("/sellerData",authContoller.sellerCarsData);
router.post("/addCarsOnRent",authContoller.addCarsOnRentABC);
router.post("/addbuyerRentedCars",authContoller.addbuyerRentedCarsABC);
router.post("/soldcars",authContoller.soldCars);
export default router;

