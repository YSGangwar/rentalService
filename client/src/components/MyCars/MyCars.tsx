import axios from 'axios';
import { useEffect, useState } from 'react';
import { CarCard } from '../CarCard/CarCard';
import { Typography , Grid,Box } from '@mui/material';

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

        <Box sx={{ flexGrow: 1 , padding:"50px"}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {cars.length!==0 ? <>
                {
                cars?.map((item)=>(
            <Grid item xs={2} sm={4} md={4} >
                <CarCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg} />
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