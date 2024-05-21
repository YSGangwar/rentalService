import { Typography ,Box} from '@mui/material';
import '@fontsource/roboto/400.css';
import { LoginForm } from '../components/LoginForm/LoginForm';
export const Login =()=>{
    return(
        <div className='signup'>
            <Typography variant='h2' sx={{ fontFamily: 'Roboto, sans-serif' }}>S I G N - U P</Typography>
            <Box sx={{ display:'flex' ,  alignItems:'center' , justifyContent:'center'}}>
                <LoginForm/>
            </Box>

        </div>
    )
}