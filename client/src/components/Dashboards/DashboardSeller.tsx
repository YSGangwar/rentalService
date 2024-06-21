import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography ,Grid} from '@mui/material';
import { BCard } from '../CarCard/BCard';
import { useSoldCars } from '../../utils/customHook';
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
    buyername:string,
}
export const DashboardSeller=()=>{
    const username = window.localStorage.getItem("username")||"";

    const { data : soldCars = [], status } = useSoldCars(username);
    
    
    if (status === 'error') {
    return <Typography variant='h6' align='center' sx={{ margin: "20px" }}>Error loading data</Typography>;
    }
    

    return (
    <div style={{marginTop:"100px" ,padding:"50px"}}>
        <Typography variant='h3' align='center' sx={{margin:"20px"}}>Dashboard</Typography>
        {
             soldCars.length==0?
             <Typography variant='h1' sx={{display:"flex" , justifyContent:"center", alignItems:"center" , height:"100vh"}}> No Cars Sold </Typography>:
             <Grid container spacing={3}>
             {
                
             soldCars?.map((item,index)=>(
                 <Grid item key={index} xs={12} sm={6} md={4} lg={3}> 
                 <BCard carName={item.carName} carPrice={item.carPrice} carType={item.carType} carImg={item.carImg}  buyername={item.buyername} sellername=""/>
                 </Grid>
             ))
             }
             </Grid>
        }
    </div>
    )
};