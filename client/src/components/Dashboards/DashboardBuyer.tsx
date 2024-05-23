import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}
type Type = {
    username:string,
  }
export const DashboardBuyer=()=>{
    const username = useSelector((state:Type)=>state.username);
    const [ rentedCars , setRentedCars] = useState<car[]>([])
    const handleRentedCars = async()=>{
        try {

            const response = await axios.post("http://localhost:3000/auth/getRentedCars",
                {username}
            );
            console.log("dashboard buyer",response.data);
            setRentedCars(response.data);
            
        } catch (error) {
            alert(error);
        }
    }
    useEffect(()=>{
        handleRentedCars();
    },[])
    return (
    <div>
        {
            rentedCars.length==0?
            <Typography> No Cars On Rent </Typography>:
            <>
            {
            rentedCars?.map((item)=>(
                <CarCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg} />
            ))
            }
            </>
        }


    </div>
    )
};