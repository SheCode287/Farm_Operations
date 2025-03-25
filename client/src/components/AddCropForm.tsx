import {useState} from 'react'
import { FormValuesType } from '../types'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Input from './Input'
import Label from './Label'
import {  toast } from 'react-toastify';
import { formatDate } from '../utils'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  closeModal: () => void;
}
const AddCropForm = ({closeModal}:Props) => {
    const [formValues, setFormValues] = useState<FormValuesType>(
     {
        name :" ",
        variety: " ",
        status : " ",
        planting_date : " ",
        expected_date :" "
     }
    )
    const [error, setError] = useState("")
    const statuses = [
        'Planted', 'Germinated', 'Growing', 'Flowering', 'Fruiting' ,'Matured', 'Harvested'
    ]
    const queryClient = useQueryClient();
    const {name, variety, status, planting_date, expected_date} = formValues
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
      
        setFormValues((prev) => ({
          ...prev,
          [name]: value, 
        }));
      };
      const handleFormSubmission = async (values: FormValuesType) => {
        if (Object.keys(values).length === 0) return
        const response = await axios.post("http://localhost:4000/v1/crops", values);
        return response.data;
      }

      const mutation = useMutation({
        mutationFn: handleFormSubmission,
        onSuccess: (data) => {
            if(data?.data?.status){
            
                toast("Crop added successfully!");
                queryClient.invalidateQueries({ queryKey: ["crops"] });
                closeModal()

            }
         
        },
        onError: (error) => {
          console.error("Error submitting form:", error);
          toast(error?.message);
        },
      });
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !variety || !status ||!planting_date || !expected_date) {
          toast("All values are required")
        }
        else{
        mutation.mutate(formValues);    
       }
      
      };
  return (
    <form onSubmit={handleSubmit}>
     <div className='form_container'>
     {error && <p className="error_message">{error}</p>}
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
      <Input  type="text"name="variety" value={variety} onChange={handleChange}/>
      </div>
      <div>
      <Label>Planting date</Label>
      <Input  type="date"name="planting_date" value={formatDate(planting_date)} onChange={handleChange}/>
      </div>
      <div>
      <Label>Expected harvest date</Label>
      <Input  type="date" name="expected_date" value={formatDate(expected_date)} onChange={handleChange}/>
      </div>
      <div>
       <Label>Select Status</Label>
       <select className="select" value={status} name="status" onChange={handleChange}>
        <option value="">Select Status</option> 
        {statuses.map((status, index) => (
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

export default AddCropForm
