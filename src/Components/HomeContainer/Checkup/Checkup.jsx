import React, { useState } from "react";
import styles from "./Checkup.module.css";

const checkupPlans = [
  {
    name: "Women Health",
    description:
      "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring.",
    image: "/assets/cy 1.png",
    services: [
      "Complete Blood Count with ESR",
      "Lipid Profile, Live Profile, Kidney Profile",
      "USG Abdomen with Pelvis, Mammography",
    ],
  },
  {
    name: "Cancer Screening",
    description:
      "Early detection can save lives. Our screening includes various cancer-related tests for prevention and safety.",
    image: "/assets/cancer_screening.png",
    services: [
      "PSA Test for Prostate Cancer",
      "Mammography & Breast Cancer Screening",
      "Colonoscopy & Other Related Tests",
    ],
  },
  {
    name: "Kids Vaccines",
    description:
      "Ensure your child’s health with essential vaccinations at the right age.",
    image: "/assets/kids_vaccine.png",
    services: [
      "Polio, Hepatitis B, DTP Vaccination",
      "MMR, Chickenpox & Other Essential Vaccines",
      "Regular Immunization Schedule",
    ],
  },
];

 export const Checkup = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Health Checkup Plans</h2>
      <p className={styles.subtitle}>
        They live in Bookmarksgrove right at the coast of the Semantics, a large
        language ocean named flows
      </p>
      
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        {checkupPlans.map((plan, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={
              activeTab === index ? styles.activeTab : styles.inactiveTab
            }
          >
            {plan.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <img
            src={checkupPlans[activeTab].image}
            alt={checkupPlans[activeTab].name}
            className={styles.image}
          />
        </div>
        
        <div className={styles.textContainer}>
          <h3 className={styles.heading}>
            {checkupPlans[activeTab].name} Checkup
          </h3>
          <p className={styles.description}>{checkupPlans[activeTab].description}</p>
          <ul className={styles.list}>
            {checkupPlans[activeTab].services.map((service, i) => (
              <li key={i} className={styles.listItem}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

