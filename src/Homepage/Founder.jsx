import React from 'react'
import styles from "./Hpage.module.css";

function Founder() {
  return (
<section>
        <h2 className={styles.ftitle}>// Founder //</h2>
        <div className={styles.Jimgcontainer}>
          <img src="assets/Jasonpic.png"></img>
        </div>
        <div className={styles.Jinfocontainer}>
          <img src="assets/Jasoninfo.png"></img>
        </div>
      </section>
  )
}

export default Founder
