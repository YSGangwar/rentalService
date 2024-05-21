import { AppBar, Button , Toolbar ,IconButton,Typography,Stack } from "@mui/material";
import CarRentalIcon from '@mui/icons-material/CarRental';
import { NavigateNextOutlined } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
function ResponsiveAppBar(){
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
          <Button color='inherit' onClick={()=>teleport("/exlpore")}>Explore </Button>
          <Button color='inherit' onClick={()=>teleport("/myrents")}>My Rents</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )

}
export default ResponsiveAppBar;