import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography ,Grid} from '@mui/material';
import { BCard } from '../CarCard/BCard';
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
    buyername:string,
}
export const DashboardSeller=()=>{
    const username = window.localStorage.getItem("username");
    const [ soldCars , setSoldCars] = useState<car[]>([])
    const handleSoldCars = async()=>{
        try {

            const response = await axios.post("http://localhost:3000/auth/soldcars",
                {username}
            );
            // console.log(username);
             console.log("dashboard rents",response.data);
            setSoldCars(response.data);
            
        } catch (error) {
            alert(error);
        }
    }
    useEffect(()=>{
        handleSoldCars();
    },[])


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