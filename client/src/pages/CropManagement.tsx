import { useState } from "react"
import AddCropForm from "../components/AddCropForm";
import Modal from "../components/Modal";
import { CropType } from "../types";
import { formatDate } from "../utils";
import DeleteCropForm from "../components/DeleteCropForm";
import EditCropForm from "../components/EditCropForm";
import useCropsHook from "../hooks/useCrops";
const CropManagement = () => {
    const [openModal, setOpenModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<CropType>({
        name: "",
        variety:"",
        planting_date: "",
        createdAt:"",
        updatedAt:"",
        _id:"",
        expected_date:""
    })
    const [selectedCropId, setSelecetdCropId] = useState("")
   
    const handleOpenModal = () => {
        setOpenModal(prev => !prev)
    }
   
    const { isPending, error, data } = useCropsHook();
      if (isPending) return <p>Loading...</p>;
      if (error) return <p>{error?.message}</p>;
      const handleEdit = (crop:CropType) =>{
        setSelectedRow(crop)
        setOpenEditModal(prev => !prev)
        setOpenDeleteModal(false)
        setOpenModal(false)
        
      }
      const handleDelete = (cropId:string) => {
        setOpenEditModal(false)
        setOpenModal(false)
        setSelecetdCropId(cropId)
       
            setOpenDeleteModal(prev => !prev)
        
      }   
  return (
    <div>
        <div 
        className="page_header">
           
           <div>
              <h2 >Crop Management</h2>
              <p>Manage crops here</p>
            </div>
           
           <button onClick={handleOpenModal}>Add crop</button>
        </div>
      <div>
  {isPending ? (
    "Loading..."
  ) : data?.data?.length > 0 ? (
    <table className="crop_table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Variety</th>
          <th>Status</th>
          <th>Planted Date</th>
          <th>Expected Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((crop: CropType) => (
          <tr key={crop._id}>
            <td>{crop.name}</td>
            <td>{crop.variety}</td>
            <td>{crop.status}</td>
            <td>{formatDate(crop.planting_date)}</td>
            <td>{formatDate(crop.expected_date)}</td>
            <td>
              <button className="edit_btn" onClick={() => handleEdit(crop)}>Edit</button>
              <button className="delete_btn" onClick={() => handleDelete(crop._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>
      <p>No crops added</p>
      <button onClick={handleOpenModal}>Add Crop</button>
    </div>
  )}
</div>

      {openModal && <Modal open={openModal} name="Add Crop" closeModal={handleOpenModal}><AddCropForm closeModal={() =>setOpenModal(false)}/></Modal>}
      {openDeleteModal && <Modal  className="modal_delete"open={openModal} name="Add Crop" closeModal={() =>{setOpenDeleteModal(false)}}><DeleteCropForm id={selectedCropId} closeModal={() =>{
        setOpenDeleteModal(false)
        setOpenModal(false)
      }}/></Modal>}
      {openEditModal && <Modal open={openModal} name="Edit Crop" closeModal={() =>{setOpenEditModal(false)}}><EditCropForm selectedRow={selectedRow} closeModal={() =>{setOpenEditModal(false)}}/></Modal>}
    </div>
  )
}

export default CropManagement
