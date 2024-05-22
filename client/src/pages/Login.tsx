import { Typography ,Box} from '@mui/material';
import '@fontsource/roboto/400.css';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
export const Login =()=>{
    const [cookies] = useCookies(['access_token']); // Access cookies

    return(
        cookies.access_token ?  
        <div> <Typography variant='h2' sx={{marginTop:"80px", display:'flex' ,  alignItems:'center' , justifyContent:'center'}}>Already Logged in </Typography></div>
        :
        <div className='signup'>
            <Typography variant='h2' sx={{ fontFamily: 'Roboto, sans-serif' }}>L O G I N</Typography>
            <Box sx={{ display:'flex' ,  alignItems:'center' , justifyContent:'center'}}>
                <LoginForm/>
            </Box>

        </div>
    )
}