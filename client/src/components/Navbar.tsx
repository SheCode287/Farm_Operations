import {useState} from 'react'
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="nav_bar">
      <div>Shamba Records</div>
      <div className="notification-container">
      <IoNotifications className="notification-icon" />
      <div className="avatar">JD</div>
    </div>
    </nav>
  )
}

export default Navbar
