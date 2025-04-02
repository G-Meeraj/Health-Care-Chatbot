import React, { useState, useEffect } from "react";
import styles from "./Special.module.css";

const doctors = [
  {
    name: "Dr. Rani Yadav",
    hospital: "Apollo Hospitals, Hyd",
    image: "/assets/Subtract.png",
    image1: "/assets/GYN.png",
    specialization: "Gynaecologist",
    treated: "5000+",
  },
  {
    name: "Dr. Arjun Kumar",
    hospital: "Fortis Hospital, Delhi",
    image: "/assets/Doctorbg.png",
    image1: "/assets/GYN.png",
    specialization: "Cardiologist",
    treated: "7000+",
  },
  {
    name: "Dr. Sneha Verma",
    hospital: "AIIMS, Mumbai",
    image: "/assets/Female.png",
    image1: "/assets/GYN.png",
    specialization: "Orthopedic",
    treated: "6000+",
  },
];

export const Special = () => {
  const [currentDoctor, setCurrentDoctor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctor((prev) => (prev + 1) % doctors.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className={styles.container}>
        {/* Left Side - Text Content */}
        <div className={styles.textContainer}>
          <p className={styles.welcome}>Welcome to eAsha!</p>
          <h1 className={`${styles.meet} ${styles.fadeInDown}`}>Meet Our</h1>
          <h1 className={`${styles.specialist} ${styles.fadeInDown}`}>Specialist</h1>
        </div>

        {/* Right Side - Dynamic Doctor Image */}
        <div className={styles.imageContainer}>
          <img
            src={doctors[currentDoctor].image}
            alt={doctors[currentDoctor].name}
            className={styles.image}
          />
        </div>
      </section>

      <div className={styles.containers}>
        {/* Doctor Info */}
        <div className={styles.infos}>
          <h3>{doctors[currentDoctor].name}</h3>
          <p className={styles.hospitals}>{doctors[currentDoctor].hospital}</p>
        </div>

        {/* Doctor Image & Specialization */}
        <div className={styles.specializations}>
          <img
            src={doctors[currentDoctor].image1}
            alt={doctors[currentDoctor].name}
            className={styles.images}
          />
          <p>{doctors[currentDoctor].specialization}</p>
        </div>

        {/* Treated Patients */}
        <div className={styles.treateds}>
          <p className={styles.labels}>Treated Across</p>
          <p className={styles.numbers}>{doctors[currentDoctor].treated}</p>
          <p className={styles.labels}>Patients</p>
        </div>

        {/* Book Appointment Button */}
        <div className={styles.books}>
          <button className={styles.buttons}>Book Appointment</button>
        </div>
      </div>
    </>
  );
};
