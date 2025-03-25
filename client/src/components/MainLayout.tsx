import Navbar from './Navbar'
import Sidenav from './Sidenav'

import { Outlet } from 'react-router'
const styles = {
  container: {
    display:"flex",
    height:"auto"
  },
  side_bar :{
    width:"20%"
  },
  main_view :{
   width:"80%",
   margin:"10px 8px",
   padding:"12px 40px"
  }

}

const MainLayout = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex h-screen" style={styles.container}>
      <div className="w-1/3 bg-gray-800 text-white p-4" style={styles.side_bar}>
          <Sidenav />
      </div>
      <div className="w-2/3 bg-gray-100 p-4"  style={styles.main_view}>
          <Outlet />
      </div>
  </div>
   </div>
  )
}

export default MainLayout
