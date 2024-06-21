import {
  Typography,
  Stack,
  Alert,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";
import { ApiWrapper } from "../../utils/ApiWrapper";
import { useAddCarsOnRent } from "../../utils/customHook";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "22px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CarCardProps {
  carName: string;
  carPrice: string;
  carType: string;
  carImg: string;
  sellername: string;
}
interface CarData {
  carName: string;
  carPrice: string;
  carType: string;
  carImg: string;
}


export const CarCard: React.FC<CarCardProps> = ({
  carName,
  carPrice,
  carType,
  carImg,
  sellername,
}) => {
  const username = window.localStorage.getItem("username")||"";
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();


  const addCarsOnRentMutation = useAddCarsOnRent();
  // const addBuyerRentedCarsMutation = useaddBuyerRentedCars();

  const rentCar = async (
    sellerUsername: string,
    carName: string,
    carPrice: string,
    carType: string,
    carImg: string
  ) => {
    const carsData = {
      carName,
      carPrice,
      carType: carType,
      carImg: carImg,
    };

    try {
      const buyerUsername = username;
      const incomingUsername = username ;
      await addCarsOnRentMutation.mutateAsync({ buyerUsername,incomingUsername, sellerUsername, carsData });

      // await addBuyerRentedCarsMutation.mutateAsync({username , sellerUsername, carsData });
      handleOpen();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, marginTop: "80px" }}>
        <CardMedia sx={{ height: 140 }} image={carImg} title={carName} />
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
          onClick={async() =>{
            try {
              await rentCar(sellername, carName, carPrice, carType, carImg)
            } catch (error) {
              console.log(error)
            }
          }}
          variant="contained"
          color="success"
          fullWidth
        >
          Rent Car
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Alert severity="success" sx={{alignItems:'center'}}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Car is Successfully Added
              </Typography>
            </Alert>
            <Stack direction="row" spacing={2} sx={{ marginTop: "40px" }}>
              <Button
                onClick={() => {
                  navigate("/dashboard");
                }}
                variant="outlined"
                color="error"
              >
                <Typography
                  id="modal-modal-description"
                  sx={{ padding: "5px" }}
                >
                  Back to Dashboard
                </Typography>
              </Button>
              <Button onClick={handleClose} variant="contained" color="primary">
                <Typography
                  id="modal-modal-description"
                  sx={{ padding: "5px" }}
                >
                  Rent More Cars
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Card>
    </div>
  );
};
