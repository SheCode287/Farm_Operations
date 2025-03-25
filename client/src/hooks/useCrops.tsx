import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCrops = async () => {
    try{
        const response = await axios.get("http://localhost:4000/v1/crops");
        return response.data;
    }
    catch(error:any){
        throw new Error(error?.message)
    }
  
};

const useCropsHook = () => {
  return useQuery({
    queryKey: ["crops"],
    queryFn: fetchCrops,
  });
};

export default useCropsHook;
