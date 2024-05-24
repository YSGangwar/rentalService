import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
interface CarCardProps {
    carName: string;
    carPrice: string;
    carType: string;
    carImg: string;
    buyername:string;
    sellername:string;
}
type tstype = {
    userType :string
}

export const BCard: React.FC<CarCardProps> = ({ carName, carPrice, carType, carImg ,buyername, sellername}) => {
    const userType = useSelector((state:tstype)=>state.userType);
  
    return (
      
          <Card sx={{ maxWidth: 345 ,  transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 5px 20px black",
          },
}}>
            <CardMedia
              component="img"
              height="140"
              image={carImg}
              alt={carName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {carName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {carPrice}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {carType}
              </Typography>
                {
                    userType==="seller" ? (buyername!==""?
                    <Typography variant="body1" color="primary">
                        Buyed By : {buyername}
                    </Typography>
                    :<></>) : sellername!==""?
                    <Typography variant="body1" color="primary">
                        Rented From : {sellername}
                    </Typography>:<></>
                }

            </CardContent>
            
          </Card>
  );
};
