import {useState} from 'react'
import Modal from '../components/Modal'
import AddResourcesForm from '../components/AddResourcesForm'
import useResourcesHook from '../hooks/useResources'



const ResourcesManagement = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(prev => !prev)
    }
    const { isPending, error, data } = useResourcesHook();
      if (isPending) return <p>Loading...</p>;
      if (error) return <p>{error?.message}</p>;
      
  return (
    <div>
        <div 
        className="page_header">
           
           <div>
              <h2> Resources Management</h2>
              <p>Add and View resources</p>
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
          <th>Name</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th>Usage Status</th>

        </tr>
      </thead>
      <tbody>
        {data?.data?.map((crop: any) => (
          <tr key={crop._id}>
            <td>{crop.name}</td>
            <td>{crop.type}</td>
            <td>{crop.quantity}</td>
            <td>{crop.unit}</td>
            <td>{crop.usage_status}</td>

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

      {openModal && <Modal open={openModal} name="Resources" closeModal={handleOpenModal}><AddResourcesForm closeModal={() =>setOpenModal(false)}/></Modal>}
    </div>
  )
}

export default ResourcesManagement
