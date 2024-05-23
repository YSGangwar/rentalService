import React, { useState } from 'react';
import axios from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button,  Grid, Radio, 
    FormControl, 
    FormLabel, 
    FormControlLabel, 
    RadioGroup, 
    Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import { LoginFormFields } from '../../models/models';
import { SiAxios } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
    const [userType,setUserType]= useState("");
    const navigate = useNavigate();
    const {register , handleSubmit ,setError ,formState:{errors , isSubmitting}} = useForm<LoginFormFields>();
    const onSubmit :SubmitHandler<LoginFormFields> = async(data) =>{
        try {
          const username:string = data.username;
          const password:string = data.password;
          console.log(data)
            const response = await axios.post("http://localhost:3000/auth/signup",{
              username,password,userType
            })
            if(response.data.code==403){
              setError("username",{
                message:response.data.message
              })
            }
            else if( response.data.code==200){
              alert(response.data.message);
              navigate("/login");
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
        
          
          
    </div>
  )
};