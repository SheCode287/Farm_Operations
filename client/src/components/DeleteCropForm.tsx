
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {toast} from "react-toastify"

const DeleteCropForm = ({id, closeModal}: {id:string, closeModal:() =>void}) => {
    const handleFormSubmission = async (id:string) => {
        const response = await axios.delete(`http://localhost:4000/v1/crops/${id}`);
        return response.data;
      }
      const queryClient = useQueryClient()
      const mutation = useMutation({
        mutationFn: handleFormSubmission,
        onSuccess: () => {
                toast("Crop deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["crops"] });
                closeModal()
        },
        onError: (error) => {
          toast(error?.message)
        },
      });
    
      const handleSubmit = () => {
        mutation.mutate(id); 
      };
  return (
    <div>
      <p style={{textAlign:"center"}}>Are you sure you want to delete?</p>
      <p style={{textAlign: "center"}}>Once deleted cannot be restored</p>
      <div style={{display:"flex", justifyContent:"space-between", margin:"12px 0"}}>
        <button onClick={handleSubmit}>delete</button>
        <button style={{background:"#777"}} onClick={closeModal}>cancel</button>
      </div>
    </div>
  )
}

export default DeleteCropForm
