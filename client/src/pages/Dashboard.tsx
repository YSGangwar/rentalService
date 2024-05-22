import { useSelector } from "react-redux";
import { DashboardSeller } from "../components/Dashboards/DashboardSeller";
import { DashboardBuyer } from "../components/Dashboards/DashboardBuyer";
type Type = {
    userType:string,
  }
export const Dashboard =()=>{
    const userType = useSelector((state:Type)=>state.userType);

    return(
        <div>
            {
                userType==="seller"?
                <DashboardSeller/>:<DashboardBuyer/>
            }
        </div>
    )
}