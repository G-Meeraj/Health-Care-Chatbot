import React from "react";
import styles from "./Pediatrician.module.css";

export const Pediatrician = () => {
  const cards = [
    {
      id: 1,
      img: "/assets/Pic.png",
      line1: "For Your Child Health",
      line2: "Pediatrician",
    },
    {
      id: 2,
      img: "/assets/Pic.png",
      line1: "For Your Child Health",
      line2: "Pediatrician",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}><span style={{color:"#0265A7",fontSize:"60px"}}>eAsha</span> is dedicated to provide best treatment.</h1>
      <p className={styles.paragraph}>
        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring 
        which I enjoy with my whole heart. <br></br>I am alone, and feel the charm of existence in this spot, 
        which was created for the bliss of souls like mine.
      </p>

      <div className={styles.container}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
   <img src={card.img} alt={card.title || "Card"} className={styles.image} />

            <p className={styles.line}>{card.line1}</p>
            <h2 className={styles.line1}>{card.line2}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};


