import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchActivities = async () => {
    try{
        const response = await axios.get("http://localhost:4000/v1/activities");
        return response.data;
    }
    catch(error:any){
        throw new Error(error?.message)
    }
  
};

const useActivitiesHook = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });
};

export default useActivitiesHook;
