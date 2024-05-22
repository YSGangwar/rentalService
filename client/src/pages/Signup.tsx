import { Typography ,Box} from '@mui/material';
import '@fontsource/roboto/400.css';
import { SignupForm } from '../components/signupForm/SignupForm';
import { useCookies } from 'react-cookie';
export const Signup =()=>{
    const [cookies] = useCookies(["access_token"])
    return(
        cookies.access_token ?
        <div><Typography variant='h2'sx={{marginTop:"80px",  display:'flex' ,  alignItems:'center' , justifyContent:'center'}} >Already Signed in </Typography></div>
        :
        <div className='signup'>
            <Typography variant='h2' sx={{ fontFamily: 'Roboto, sans-serif' }}>S I G N - U P</Typography>
            <Box sx={{ display:'flex' ,  alignItems:'center' , justifyContent:'center'}}>
                <SignupForm/>
            </Box>

        </div>
    )
}