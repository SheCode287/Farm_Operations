import {useState} from 'react'
import Modal from '../components/Modal'
import { formatDate } from '../utils'
import useActivitiesHook from '../hooks/useActivities'
import AddActivity from '../components/AddActivity'
import useCropsHook from '../hooks/useCrops'
import { CropType } from '../types'

const ActivityManagement = () => {
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => {
        setOpenModal(prev => !prev)
    }
   
    const { isPending, error, data } = useActivitiesHook();
    const {data: crops} = useCropsHook()
      if (isPending) return <p>Loading...</p>;
      if (error) return <p>{error.message}</p>;
      
  return (
    <div>
         <div 
        className="page_header">
           
           <div>
              <h2> Activity Management</h2>
              <p>Add and View activities</p>
            </div>
           
           <button onClick={handleOpenModal}>Add resource</button>
        </div>

   
      <div>
  {isPending ? (
    "Loading..."
  ) : data?.data?.length > 0 ? (
    <table className="crop_table">
      <thead>
        <tr>
          <th>Crop</th>
          <th>Activity Type</th>
          <th>Description</th>
          <th>Activity Date</th>

        </tr>
      </thead>
      <tbody>
        {data?.data?.map((crop: any) => 
        {
          console.log(crop?.crop_id)
           const cropName = crops?.data?.find((c:CropType) =>  c._id === crop?.crop_id)?.name
          return (
            <tr key={crop._id}>
              <td>{cropName ? cropName :" No record "}</td>
              <td>{crop.activity_type}</td>
              <td>{crop.description}</td>
              <td>{formatDate(crop.activity_date)}</td>
  
            </tr>
          )
        }
        )}
      </tbody>
    </table>
  ) : (
    <div>
      <p>No crops added</p>
      <button onClick={handleOpenModal}>Add Crop</button>
    </div>
  )}
</div>

      {openModal && <Modal open={openModal} name="Activities" closeModal={handleOpenModal}><AddActivity closeModal={() => setOpenModal(false)}/></Modal>}
    </div>
  )
}

export default ActivityManagement
