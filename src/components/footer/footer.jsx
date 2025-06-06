import { useState } from "react";
import styles from './footer.module.css'

export default function Footer() {
  let date = new Date();
  let [year, setYear] = useState(date.getFullYear());

  return (
    <div className={styles.footerBox}>
      <p className={styles.footerContent}>copyright {year}, 마르코 멘토님팀 일행 All Rights Reserved.</p>
    </div>
  )
}
