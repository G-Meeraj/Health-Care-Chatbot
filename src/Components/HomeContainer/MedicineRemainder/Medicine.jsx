import React from "react";
import styles from "./Medicine.module.css";

export const Medicine= () => {
  const cards = [
    { id: 1, title: "Medicine Reminder", img: "/assets/mr 1.png" },
    { id: 2, title: "TeleConsultation", img: "/assets/pngaaa.png" },
    { id: 3, title: "Ai Diagnosis Tool", img: "/assets/diagnostic.png" },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          <img src={card.img} alt={card.title} className={styles.image} />
          <div className={styles.cardContent}>{card.title}</div>
        </div>
      ))}
    </div>
  );
};


