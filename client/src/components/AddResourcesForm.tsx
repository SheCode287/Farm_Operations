import {useState} from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Input from './Input'
import Label from './Label'
import {toast} from "react-toastify"
import { useQueryClient } from '@tanstack/react-query'

interface FormType {
    name:string;
    quantity: number;
    type:string;
    unit:string;
    usage_status:string


}

const AddResourcesForm = ({closeModal}:{closeModal: () => void}) => {
    const [formValues, setFormValues] = useState<FormType>(
        {
           name : " ",
           quantity: 0,
           type:"",
           unit:"",
           usage_status:""
        }
       )
       const {name, quantity, type, unit, usage_status} = formValues
       const usageStatus = [
           'Available', 'In Use', 'Growing', 'Depleted',
       ]
       const units = ['kg','litres','units', 'bags']
       const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value, 
        }));
      };
      const handleFormSubmission = async (values: FormType) => {
        const response = await axios.post("http://localhost:4000/v1/resources", values);
        return response.data;
      }
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: handleFormSubmission,
      onSuccess: (data) => {
        toast("Resource added successfully!");
        queryClient.invalidateQueries({ queryKey: ["resources"] });
        closeModal()
       
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
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
       <Label>Name</Label>
       <Input
       type="text"
       name="name"
       value={name}
       onChange={handleChange}
       placeholder="Enter crop name"
     />
     </div>
     <div>
     <Label>Variety</Label>
     <Input  type="number" name="quantity" value={quantity} onChange={handleChange}/>
     </div>
     <div>
     <Label>Type</Label>
     <Input  type="text"name="type" value={type} onChange={handleChange}/>
     </div>
     <div>
       <Label>Select Unit</Label>
       <select className="select" value={unit} name="unit" onChange={handleChange}>
        <option value="">Select unit</option> 
        {units.map((status, index) => (
            <option key={index} value={status}>{status}</option>
        ))}
        </select>
     </div>
     <div>
       <Label>Select Status</Label>
       <select className="select" value={usage_status} name="usage_status" onChange={handleChange}>
        <option value="">Select Status</option> 
        {usageStatus.map((status, index) => (
            <option key={index} value={status}>{status}</option>
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

export default AddResourcesForm
