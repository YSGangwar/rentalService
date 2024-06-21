import { TextField, Typography,Button ,Alert} from '@mui/material';
import {useForm, SubmitHandler} from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAddRentedCars } from '../../utils/customHook';
interface FormFields {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}
interface TYPE {
    username:string
}



export const AddCar = () => {

    const username = window.localStorage.getItem('username')||"";
    const navigate = useNavigate();
    const [showSuccess , setShowSuccess] = useState(false);
    const [reloadPage, setReloadPage ] = useState(false);
    const { register , handleSubmit ,setError, reset ,formState:{errors,isSubmitting}} = useForm<FormFields>();
    const addRentedCarsMutation = useAddRentedCars();


    const submitForm : SubmitHandler<FormFields> = async(carsData) => {
        try {

            await addRentedCarsMutation.mutateAsync({username,carsData});
            
            const response = addRentedCarsMutation;
            console.log(response);
            if(response.status=="error"){
              return <h1>Error occured</h1>
            }
            if(response.isError==false){
                setShowSuccess(true);
                reset();
            }

        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)} style={{display:'flex', flexDirection:'column', alignItems:"center",gap:'2rem' , marginTop:"70px"}} >
                <TextField 
                {
                    ...register("carName",{
                        required:"Name is Required",
                    })
                }
                sx={{width:"500px"}}
                error={!!errors.carName}
                id="outlined-error-helper-text"
                label="Car Name"
                type="text"
                helperText={errors.carName?.message}
                />
                <TextField 
                {
                    ...register("carPrice",{
                        required:"Price is Required",
                    })
                }
                sx={{width:"500px"}}
                error={!!errors.carPrice}
                id="outlined-error-helper-text"
                label="Car Price"
                type="digit"
                helperText={errors.carPrice?.message}
                />
                <TextField 
                {
                    ...register("carType",{
                        required:"Type is Required",
                    })
                }
                sx={{width:"500px"}}
                error={!!errors.carType}
                id="outlined-error-helper-text"
                label="Car Type"
                type="text"
                helperText={errors.carType?.message}
                />
                <TextField 
                {
                    ...register("carImg",{
                        required:"Image is Required",
                    })
                }
                sx={{width:"500px"}}
                error={!!errors.carImg}
                id="outlined-error-helper-text"
                label="Image Link "
                type="text"
                helperText={errors.carImg?.message}
                />
                {showSuccess && 
                <Alert variant="filled" severity="success">
                   Successfully Data Submitted
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
        </div>
    )
};