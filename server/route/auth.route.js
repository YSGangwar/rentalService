import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import {authContoller} from '../contoller/index.js';
const router = express.Router()
router.post("/signup", authContoller.signUp);
router.post("/login", authContoller.login);
router.post("/getRentedCars",authMiddleware,authContoller.getRentedCars);
router.post("/addRentedCars",authMiddleware,authContoller.addRentedCars);
router.post("/getMyCars",authMiddleware,authContoller.getMyCars);
router.get("/sellerData",authMiddleware, authContoller.sellerCarsData);
router.post("/addCarsOnRent",authMiddleware ,authContoller.addCarsOnRentABC);
router.post("/addbuyerRentedCars",authMiddleware,authContoller.addbuyerRentedCarsABC);
router.post("/soldcars",authMiddleware,authContoller.soldCars);
export default router;

