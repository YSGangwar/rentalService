import { AppBar, Button , Toolbar ,IconButton,Typography,Stack } from "@mui/material";
import CarRentalIcon from '@mui/icons-material/CarRental';
import { useNavigate } from "react-router-dom";
import  { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useState } from "react";
type Type = {
  userType:string,
}
function ResponsiveAppBar(){
    const [cookies,setCookie, removeCookie] = useCookies(['access_token']); // Access cookies
    const accessToken = cookies.access_token;
    const logout=()=>{
        removeCookie("access_token", { path: '/' });
        window.localStorage.removeItem("userID");
        navigate("/");


    };
  const userType = useSelector((state:Type)=>state.userType);
  const navigate = useNavigate();
  const teleport =(path:string)=>{
    navigate(`${path}`);
  }
  return (
    <AppBar position="fixed" sx={{backgroundColor:"#990000"}}>
      <Toolbar>
        <IconButton onClick={()=>teleport("/")} size='large' edge='start' color='inherit' aria-label='logo'>
          <CarRentalIcon/>
        </IconButton>
        <Typography variant='h6' component='div'>
        Targaryen Rentals
        </Typography>
        <Stack direction='row' spacing={2} sx={{ marginLeft: 'auto' }}>
          {
            !accessToken ?
            <>
              <Button color='success' variant="contained" onClick={()=>{navigate("/login")}}> Login </Button>
            </> :
            <>
              
           
              <Button color='warning' variant="contained" onClick={logout}> Logout </Button>
            </>
          }
          {
            accessToken && userType==="seller" ? 
            <>
              <Button color='inherit' onClick={()=>teleport("/addCar")}>Add Car</Button>
              <Button color='inherit' onClick={()=>teleport("/mycars")}>My Cars</Button>
              <Button color='inherit' onClick={()=>teleport("/dashboard")}>Dashboard</Button>
            </> :
            <>
            {
              accessToken && userType==="buyer" ?
              <> 
              <Button color='inherit' onClick={()=>teleport("/explore")}>Explore</Button>
              <Button color='inherit' onClick={()=>teleport("/dashboard")}>Dashboard</Button>
              </>
              :
              <>
              </>
            } 

            </>
          }
        </Stack>
      </Toolbar>
    </AppBar>
  )

}
export default ResponsiveAppBar;