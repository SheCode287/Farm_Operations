
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Label from "./Label"
import Input from "./Input"
import { toast } from 'react-toastify';
import { FormValuesType } from "../types"
import axios from "axios"
const EditCropForm = ({selectedRow, closeModal}:any) => {
    const prevFormValues ={
        name:selectedRow.name,
        variety: selectedRow.variety,
        status: selectedRow.status,
        planting_date: selectedRow.planting_date
    ? new Date(selectedRow.planting_date).toISOString().split("T")[0]
    : "",
  expected_date: selectedRow.expected_date
    ? new Date(selectedRow.expected_date).toISOString().split("T")[0]
    : "",
    }
    const [error, setError] = useState("")
    const [formValues, setFormValues] = useState<FormValuesType>(
        prevFormValues
       )
       const statuses = [
        'Planted', 'Germinated', 'Growing', 'Flowering', 'Fruiting' ,'Matured', 'Harvested'
    ]
    
    const queryClient = useQueryClient()
    const {name, variety, status, planting_date, expected_date} = formValues
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
      
        setFormValues((prev) => ({
          ...prev,
          [name]: value, 
        }));
      };
       const handleFormSubmission = async (values: FormValuesType) => {
        if (Object.keys(values).length === 0) {
           setError("All values are required")
        }
        
        const response = await axios.put(`http://localhost:4000/v1/crops/${selectedRow._id}`, values);
        return response.data;
      }
      const mutation = useMutation({
        mutationFn: handleFormSubmission,
        onSuccess: () => {
            
                toast("Crop updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["crops"] });
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
      <Input  type="date"name="planting_date" value={planting_date} onChange={handleChange}/>
      </div>
      <div>
      <Label>Expected harvest date</Label>
      <Input  type="date" name="expected_date" value={expected_date} onChange={handleChange}/>
      </div>
      <div>
        <Label>Select Status</Label>
        <select className='select' value={status} name="status" onChange={handleChange}>{statuses.map((status, index:number) =><option key={index}>{status}</option>)}</select>
      </div>
     </div>
     <div className="modal_footer">
     <button >Edit</button>
     <button  style={{backgroundColor:"#777"}} onClick={closeModal}>Cancel</button>
     </div>
    </form>
  )
}

export default EditCropForm
