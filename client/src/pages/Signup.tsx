import { Typography ,Box} from '@mui/material';
import '@fontsource/roboto/400.css';
import { SignupForm } from '../components/signupForm/SignupForm';
export const Signup =()=>{
    return(
        <div className='signup'>
            <Typography variant='h2' sx={{ fontFamily: 'Roboto, sans-serif' }}>S I G N - U P</Typography>
            <Box sx={{ display:'flex' ,  alignItems:'center' , justifyContent:'center'}}>
                <SignupForm/>
            </Box>

        </div>
    )
}