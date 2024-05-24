import { useEffect, useState } from "react";
import axios from 'axios';
import { Typography ,Box, Grid, Stack,Button  } from "@mui/material";
import { yellow ,purple} from "@mui/material/colors";
import { CarCard } from "../components/CarCard/CarCard";

interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}



export const Explore = () =>{
    
    const [sellerCarsData , setSellerCarsData] = useState();
    const username = window.localStorage.getItem("username");
    const sellerDetails = async() =>{
        try {
            const response = await axios.get("http://localhost:3000/auth/sellerData");
            setSellerCarsData(response.data);
            console.log(response.data);
        } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        sellerDetails()
    },[])
    return(
        <div style={{marginTop:"50px" , padding:"50px"}}>
            {
                sellerCarsData?.map((sellerDetail:any)=>(
                    
                    <Box>
                        <Grid container spacing={3}>
                            {
                                sellerDetail.myCars.map((cars:car,index)=>
                                (
                                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>                                     
                                    <CarCard carName={cars.carName} carPrice={cars.carPrice} carType={cars.carType} carImg={cars.carImg}  sellername={sellerDetail.username}/>                               
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                ))
            }
        </div>
    )
};