import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { useSelector } from 'react-redux';
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
            rentedCars?.map((item)=>(
                <CarCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg} />
            ))
        }

    </div>
    )
};