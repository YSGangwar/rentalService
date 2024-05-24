import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { Typography , Grid,Box,Card, CardMedia, CardContent, Button } from '@mui/material';
import { BCard } from '../CarCard/BCard';

interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}

export const MyCars = () =>{
    const [cars,setCars] = useState<car[]>([]);
    const username = window.localStorage.getItem("username");
    const displayMycars = async()=>{
        try {
            const response = await axios.post("http://localhost:3000/auth/getMyCars",{
                username
            })
            console.log(response.data);
            setCars(response.data);
        } catch (error) {
            alert(error);
        }
    }
    useEffect(()=>{
        displayMycars()
    },[])
    return (

        <Box sx={{ flexGrow: 1 , padding:"50px" ,marginTop:"100px"}}>
        <Grid container spacing={3}>
          {cars.length!==0 ? <>
                {
                cars?.map((item,index)=>(
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <BCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg} buyername="" sellername=""/>
            </Grid>
            ))
          }
        </>:<>
            <Typography variant='h3'> No Cars In Your Inventry </Typography>
            </>
        }
        </Grid>
      </Box>
   )
}