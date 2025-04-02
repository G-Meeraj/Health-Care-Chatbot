import React from "react";
// import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
  return (
    <nav className={styles.navbar}>
      {/* Left Section - Logo */}
      <div className={styles.logo}>
        <img src="/assets/eAshalogo.png" alt="Company Logo" />
      </div>

      {/* Center Section - Navigation Links */}
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Specialist</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Health Plans</li>
      </ul>

      {/* <ul className={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/specialist">Specialist</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/healthplans">Health Plans</Link></li>
      </ul> */}
      {/* Right Section - Book Appointment Button */}
      <div className={styles.bookBtn}>
   
          <button>Book Appointment</button>
     
        {/* <Link to="/bookappointment">
          <button>Book Appointment</button>
        </Link> */}
      </div>
    </nav>
  );
};
