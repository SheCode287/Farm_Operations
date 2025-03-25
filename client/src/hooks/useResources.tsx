import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchResources = async () => {
    try{
        const response = await axios.get("http://localhost:4000/v1/resources");
        return response.data;
    }
    catch(error:any){
        throw new Error(error?.message)
    }
  
};

const useResourcesHook = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });
};

export default useResourcesHook;
