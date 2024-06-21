import axios from 'axios';
import AxiosInstance from './interceptor';

export const ApiWrapper = async (endpoint: string, methodType: string, payload?: any) => {
  try {
    let response;
    switch (methodType) {
      case "POST":
        // console.log("checkkkk")
        response = await AxiosInstance.post(`${endpoint}`, payload);
        break;
      case "GET":
        response = await AxiosInstance.get(`${endpoint}`);
        break;
      default:
        throw new Error(`Unsupported method type: ${methodType}`);
    }

    return response.data;
  } catch (error) {
    console.error('API call failed:',endpoint,methodType,payload);
    throw error; 
  }
  
};