import { MdDashboard } from "react-icons/md";
import { FaCropSimple } from "react-icons/fa6";
import { GrResources } from "react-icons/gr";
import { FiActivity } from "react-icons/fi";
import { NavLink } from "react-router";


const navLinks = [
  { label: "Dashboard", path: "/dashboard", icon: <MdDashboard size={20}/> },
  { label: "Crop Management", path: "/crops", icon: <FaCropSimple size={20}/> },
  { label: "Resources Management", path: "/resources", icon: <GrResources size={20}/> },
  { label: "Activity Management", path: "/activities", icon: <FiActivity size={20}/> },
];

const Sidenav = () => {
  return (
    <div className="sidenav">
      <ul>
        {navLinks.map((item) => (
          <NavLink to={item.path} key={item.label} className="nav-item">
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidenav;
