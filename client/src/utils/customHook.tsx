import { useQuery ,useMutation } from "@tanstack/react-query";
import { ApiWrapper } from "./ApiWrapper";
interface car {
    carName:string,
    carPrice:string,
    carType:string,
    carImg:string,
}
interface CarData {
  carName: string;
  carPrice: string;
  carType: string;
  carImg: string;
}

interface SellerDetail {
    username: string;
    myCars: car[];
  }
const fetchSellerCarsData = async () => {
    return await ApiWrapper("auth/sellerData", "GET");
  };


export const useSellerCarsData=()=>{
    return useQuery<SellerDetail[]>({
        queryKey: ['sellerCarsData'],
        queryFn: fetchSellerCarsData,
        staleTime: 1000 * 60 * 5, 
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false, 
        refetchOnMount: false,
      });
}


const fetchAddCarOnRent = async (
  buyerUsername: string,
  incomingUsername:string,
  sellerUsername: string,
  carsData: CarData
) => {
  return await ApiWrapper("auth/addCarsOnRent", "POST", {
    buyerUsername,
    incomingUsername,
    sellerUsername,
    carsData,
  });
};



export const useAddCarsOnRent = ()=>{
  return useMutation({
    mutationFn: ({ buyerUsername,incomingUsername, sellerUsername, carsData }: { buyerUsername: string,incomingUsername:string, sellerUsername: string, carsData: CarData }) =>
      fetchAddCarOnRent(buyerUsername,incomingUsername, sellerUsername, carsData),
  });
} 


const fetchRentedCars = async (username:string) => {
  return await ApiWrapper("auth/getRentedCars", "POST", { username });
};

export const useRentedCars = (username:string ) => {
  return useQuery({
    queryKey :['rentedCars', username],
    queryFn:() => fetchRentedCars(username),
      enabled: !!username, // Ensure the query runs only if username is available
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Unused data remains in cache for 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};

const fetchGetMyCars = async(username :string )=>{
  return await ApiWrapper("auth/getMyCars","POST",{username});
}

export const useGetMyCars = (username :string ) =>{
  return useQuery({
    queryKey:['cars',username],
    queryFn:()=>fetchGetMyCars(username),
    // enabled:!!username,
    staleTime : 1000 * 60 * 5,
    cacheTime : 1000 * 60 * 5,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
  })
}

const fetchSoldCars = async(username:string) =>{
  return await ApiWrapper("auth/soldcars","POST",{username});
}


export const useSoldCars = (username:string) =>{
  return useQuery({
    queryKey : ['soldCars',username],
    queryFn:()=> fetchSoldCars(username),
    enabled:!!username,
    staleTime : 1000*60*5 ,
    cacheTime : 1000*60*5 ,
    refetchOnWindowFocus:false,
    refetchOnMount:false,
  })
}

const fetchAddRentedCars  = async(username:string,carsData:CarData)=>{
  return await ApiWrapper("auth/addRentedCars","POST",{username,carsData});
}
export const useAddRentedCars = ()=>{
  return useMutation({
    mutationFn: ({ username , carsData }: { username: string, carsData: CarData }) =>
      fetchAddRentedCars(username, carsData),
  });
} 