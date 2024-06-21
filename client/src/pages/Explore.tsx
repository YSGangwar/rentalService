import { useEffect, useState } from "react";
import axios from 'axios';
import { Typography ,Box, Grid, Stack,Button  } from "@mui/material";
import { yellow ,purple} from "@mui/material/colors";
import { CarCard } from "../components/CarCard/CarCard";
import { useQuery } from "@tanstack/react-query";
import { ApiWrapper } from "../utils/ApiWrapper";
import { useSellerCarsData } from "../utils/customHook";
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}
interface SellerDetail {
    username: string;
    myCars: car[];
  }
  
 

export const Explore = () =>{
    
    const username = window.localStorage.getItem("username");
    
    const { isLoading, data, error } = useSellerCarsData();
    
      if (isLoading) {
        return <h1>Loading ....</h1>;
      }
    
      if (error || !data) {
        return <h1>Error loading data</h1>;
      }
    
    return (
        <div style={{ marginTop: "50px", padding: "50px" }}>
          {data.map((sellerDetail) => (
            <Grid container spacing={3} key={sellerDetail.username}>
              {sellerDetail.myCars.map((car, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <CarCard
                    carName={car.carName}
                    carPrice={car.carPrice}
                    carType={car.carType}
                    carImg={car.carImg}
                    sellername={sellerDetail.username}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </div>
      );
};