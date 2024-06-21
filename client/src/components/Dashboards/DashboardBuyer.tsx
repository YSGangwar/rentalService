import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { Typography ,Grid} from '@mui/material';
import { BCard } from '../CarCard/BCard';
import { useRentedCars } from '../../utils/customHook';
import { useMutation, useQuery } from "@tanstack/react-query";

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

    const { data: rentedCars = [], status } = useRentedCars(username);

    if (status === "loading") {
        return <Typography variant='h6' align='center' sx={{ margin: "20px" }}>Loading...</Typography>;
      }
    
    if (status === 'error') {
    return <Typography variant='h6' align='center' sx={{ margin: "20px" }}>Error loading data</Typography>;
    }
    
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