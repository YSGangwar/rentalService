import React, { useState } from 'react';
import axios  from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import { UseDispatch, useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
import { Button,Grid, Radio,
  Typography ,
    FormControl, 
    FormLabel, 
    FormControlLabel, 
    Alert,
    RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LoginFormFields } from '../../models/models';
import { useNavigate } from 'react-router-dom';
import { getUserType, saveUsername } from '../../services/Actions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [_,setCookies]=useCookies(["access_token"]);
    const [userType,setUserType]= useState("");
    const navigate = useNavigate();
    const [userTypeError , setUserTypeError] = useState(false);
    const {register , handleSubmit ,setError ,formState:{errors , isSubmitting}} = useForm<LoginFormFields>();
    const onSubmit :SubmitHandler<LoginFormFields> = async(data) =>{
        try {
          const username = data.username;
          const password = data.password;
          const response = await axios.post("http://localhost:3000/auth/login",{
            username, password, userType
          })
          
          if(response.data.code===401){
            setError("password",{
              message:response.data.message
          })
          }
          else if(response.status === StatusCodes.UNAUTHORIZED){
            setError("username",{
              message:response.data.message
            })
          }
          else if(response.data.code==402){
            setUserTypeError(true);
          }
          else{
            console.log("token",response.data.token,"ID",response.data.userID);
            setCookies("access_token",response.data.token);
            window.localStorage.setItem("CoreToken",response.data.token);
            window.localStorage.setItem("userID",response.data.userID);
            dispatch(getUserType(userType));
            window.localStorage.setItem("username",username);
            dispatch(saveUsername(username));
            navigate("/dashboard")
          }
          
        } catch (error) {
            alert(error);
        }
        
    }
  return (
    <div >
    
              <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', flexDirection:'column', width:'500px',gap:'2rem'}}>
                
                <TextField
                  {...register("username",{
                    required:"email is Required",
                    minLength:{
                        value:4,
                        message:"username must me of 4 length"
                    }
                    }) 
                  }
                  error={!!errors.username}
                  id="outlined-error-helper-text"
                  label="Username"
                  type="text"
                  helperText={errors.username?.message}
                />

                <TextField 
                    {...register("password",{
                      required:"Password is Required",
                      pattern:{
                          value:/\d/,
                          // value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:"password  must be of  Proper Format (Special, UpperCase, digit ,lowercase)"
                      }
                    })}
                    error={!!errors.password}
                    id="outlined-error-helper-text"
                    label="Password"
                    type="password"
                    helperText={errors.password?.message}
                
                />
               
                <Grid item xs={6}>
                <FormControl>
                    <FormLabel>User  Type  </FormLabel>
                    <RadioGroup 
                    value={userType}
                    onChange={(e)=>{setUserType(e.target.value)}}
                    >
                        <FormControlLabel value="seller" control={<Radio/>} label="SELLER"  />
                        <FormControlLabel value="buyer" control={<Radio/>} label="BUYER"  />
                    </RadioGroup>
                </FormControl>
                </Grid>
                {
                  userTypeError && 
                  <Alert variant="filled" severity="error">
                     User Type is Wrong 
                  </Alert>
                }
                <Button 
                variant='contained' color="success"
                disabled={isSubmitting} type="submit"> 
                {  isSubmitting ?
                <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
                
                :"Submit"}
                </Button>
            </form>   
            <Typography variant='h6' sx={{marginTop:"30px"}}> Dont Have a Account <span><a href="http://localhost:5173/signup">Sign Up</a></span> Here</Typography>

        
          
          
    </div>
  )
};