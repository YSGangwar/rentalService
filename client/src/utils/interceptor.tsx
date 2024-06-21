import axios  from "axios";
const BASE_URL = "http://localhost:3000";


const createAxiosInstance = () => {
    const commmonAxios = axios.create({
        baseURL : `${BASE_URL}/`,
    });

    const interceptor = async (config :any)=> {
        const token = localStorage.getItem("CoreToken");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
    commmonAxios.interceptors.request.use(interceptor);
    return commmonAxios;
}

const AxiosInstance = createAxiosInstance();
export default AxiosInstance;


