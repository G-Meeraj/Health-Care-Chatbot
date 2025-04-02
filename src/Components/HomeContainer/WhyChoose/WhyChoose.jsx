import styles from "./WhyChoose.module.css";

export const WhyChoose = () => {
  return (
    <div className={styles.container}>
      {/* Left Side - Card with Content */}
      <div className={styles.leftCard}>
        <h2>Why Choose eAsha?</h2>
        <ul>
          <li> Easy & Fast Appointments</li>
          <li> Multiple Specialties & Hospitals</li>
          <li> Real-Time Availability</li>
          <li> Smart Notifications & Reminders</li>
          <li> Secure & Private</li>
          <li> 24/7 Support</li>
        </ul>
      </div>

      {/* Right Side - Heading, Paragraph, Button */}
      <div className={styles.rightContent}>
        <h1>Dedicated to Provide the Best Treatment.</h1>
        <p>
          They live in Bookmarksgrove right at the coast of the 
          Semantics, a large language ocean. A small river named Duden 
          flows by their place and supplies it.
        </p>
        <button className={styles.button}>Book Appointment</button>
      </div>
    </div>
  );
};


