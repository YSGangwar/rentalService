import { Navigate,Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export const ProtectedRoutes = () =>{
    const [cookies] = useCookies(['access_token']); // Access cookies

    return(
        cookies.access_token ? <Outlet/> : <Navigate to="/login"/>
    )
}