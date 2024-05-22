import express from 'express'
import {authContoller} from '../contoller/index.js';
const router = express.Router()
router.post("/signup", authContoller.signUp);
router.post("/login", authContoller.login);
router.post("/getRentedCars",authContoller.getRentedCars);
router.post("/addRentedCars",authContoller.addRentedCars);
export default router;

