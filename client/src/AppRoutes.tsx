import { useRoutes } from "react-router"
import Dashboard from "./pages/Dashboard"
import CropManagement from "./pages/CropManagement"
import ResourcesManagement from "./pages/ResourcesManagement"
import ActivityManagement from "./pages/ActivityManagement"
import MainLayout from "./components/MainLayout"

const AppRoutes = () => {
  return useRoutes([
    {path:"/",
     element: <MainLayout/>,
     children: [
        {path:"/dashboard", element: <Dashboard/>},
        {path:"/crops", element: <CropManagement/>},
        {path:"/resources", element: <ResourcesManagement/>},
        {path:"/activities", element: <ActivityManagement/>}
     ]
    }
  ])
}

export default AppRoutes
