import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { Typography ,Grid} from '@mui/material';
import { BCard } from '../CarCard/BCard';
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
    sellername:string,
}
type Type = {
    username:string,
  }
export const DashboardBuyer=()=>{
    const username = window.localStorage.getItem("username");
    const [ rentedCars , setRentedCars] = useState<car[]>([])
    const handleRentedCars = async()=>{
        try {

            const response = await axios.post("http://localhost:3000/auth/getRentedCars",
                {username}
            );
            // console.log(username);
            // console.log("dashboard buyer",response.data);
            setRentedCars(response.data);
            
        } catch (error) {
            alert(error);
        }
    }
    useEffect(()=>{
        handleRentedCars();
    },[])
    return (
    <div style={{padding:"20px" , marginTop:"100px"}}>
    <Typography variant='h3' align='center' sx={{margin:"20px"}}>DashBoard</Typography>

        {
            rentedCars.length==0?
            <Typography> No Cars On Rent </Typography>:
            <Grid container spacing={3}>
            {
            rentedCars?.map((item,index)=>(
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}> 
                <BCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg} buyername="" sellername={item.sellername} />
                </Grid>
            ))
            }
            </Grid>
            
        }


    </div>
    )
};