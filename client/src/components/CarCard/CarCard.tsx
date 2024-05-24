import { Typography, Stack, Card, CardActions, CardContent, CardMedia, Button } from "@mui/material"
import axios from 'axios';
interface CarCardProps {
    carName: string;
    carPrice: string;
    carType: string;
    carImg: string;
    sellername:string;
}

export const CarCard: React.FC<CarCardProps> = ({ carName, carPrice, carType, carImg ,sellername}) => {
  const username = window.localStorage.getItem("username");

  const rentCar =async(sellerUsername:string,carName:string, carPrice:string, carType:string, carImg:string)=>{
    const carsData ={
      carName:carName,
      carPrice:carPrice,
      carType: carType,
      carImg: carImg,
    };
    
    try {
        const buyerUsername = username ;
        const response1 = await axios.post("http://localhost:3000/auth/addCarsOnRent",{
            buyerUsername , sellerUsername,carsData
        })
        console.log("response carsOnRent",response1.data);
        const result = await axios.post("http://localhost:3000/auth/addbuyerRentedCars",{
            username,sellerUsername, carsData
        })
        console.log("response buyer rents",result.data);
        // / you have to implement if a button is cliked torent a car then it should bw not be ble t  clik again
    } catch (error) {
        alert(error);
    }
}
  
    return (
        <div>
             <Card sx={{ maxWidth: 345 , marginTop:"80px"}}>
              <CardMedia
                sx={{ height: 140 }}
                image={carImg}
                title={carName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {carName}
                </Typography>
                <Stack>
                <Typography variant="body2" color="text.secondary">
                  {carPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {carType}
                </Typography>
                <Typography variant="body1" color="primary">
                  Cars of : {sellername}
                </Typography>
                

                </Stack>
                
              </CardContent>
              <Button 
              onClick={()=> rentCar(sellername,carName, carPrice, carType, carImg )}
              variant="contained" color="success" fullWidth>
                Rent Car
              </Button>
            </Card>
        </div>
    )
}