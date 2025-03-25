import {useState} from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Input from './Input'
import Label from './Label'
import useCropsHook from '../hooks/useCrops'
import {toast} from "react-toastify"
import { CropType } from '../types'

interface FormType {
    description : string,
    activity_date: string,
    activity_type: string,
    crop_id: string
}

const AddActivity = ({closeModal}:{closeModal :()=> void}) => {
    const [formValues, setFormValues] = useState<FormType>(
        {
           description : " ",
           activity_date: "",
           activity_type:"",
           crop_id:""
           
        }
       )
       const {description, activity_date, activity_type, crop_id} = formValues
       const queryClient = useQueryClient();
       const {data} = useCropsHook()
       const activityTypes = ['Planting',
          'Irrigation',
          'Weeding',
          'Fertilization',
          'Pest Control',
          'Harvesting']
       const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value, 
        }));
      };
      const handleFormSubmission = async (values: FormType) => {
        const response = await axios.post("http://localhost:4000/v1/activities", values);
        return response.data;
      }

    const mutation = useMutation({
      mutationFn: handleFormSubmission,
      onSuccess: (data) => {

       toast("Activity added successfully!");
       queryClient.invalidateQueries({ queryKey: ["activities"] });
       closeModal()
     },
      onError: (error) => {
      
        toast(error?.message);
      },
    });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutation.mutate(formValues); 
    };
  return (
    <form onSubmit={handleSubmit}>
    <div className='form_container'>
    <div>
       <Label>Description</Label>
       <Input
       type="text"
       name="description"
       value={description}
       onChange={handleChange}
       placeholder="Enter crop name"
     />
     </div>
     <div>
     <Label>Activity Date</Label>
     <Input  type="date" name="activity_date" value={activity_date} onChange={handleChange}/>
     </div>
     <div>
       <Label>Select Activity Type</Label>
       <select className="select" value={activity_type} name="activity_type" onChange={handleChange}>
        <option value="">Select activity type</option> 
        {activityTypes?.map((type:string,index:number) => (
            <option key={index} value={type}>{type}</option>
        ))}
        </select>
     </div>
     
     <div>
       <Label>Select Crop</Label>
       <select className="select" value={crop_id} name="crop_id" onChange={handleChange}>
        <option value="">Select Crop</option> 
        {data?.data?.map((status:CropType) => (
            <option key={status._id} value={status._id}>{status.name}</option>
        ))}
        </select>
     </div>
    </div>
    <button  style={{
       margin:"10px 0"
    }}type="submit">{mutation.isSuccess ? "Loading..." : "Add "}</button>
   </form>
  )
}

export default AddActivity
