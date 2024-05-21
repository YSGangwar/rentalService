import { Typography ,Button} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export const Home =()=>{
    const navigate = useNavigate();
    return(
        <div >
            <div className="homeImg" style={{ display:'flex', flexDirection:"column" ,justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h1" align="center" sx={{
                marginBottom: "12rem",
                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Text shadow for better visibility
                backdropFilter: "blur(10px)" ,// Blurred background effect
                }}  >
                    Best Car Rental Service 
                </Typography>
                <Button variant="contained" onClick={()=>{navigate("/login")}} sx={{backgroundColor:"#990000"}}> Get Started Now  </Button>
            </div>
        </div>
    );
}