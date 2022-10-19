import EOSD from "../components/eosdcomp"
import Links from "../components/links"
import styles from '../styles/eosd.module.css'


export default function Home3() {

  return (
    <div className={styles.main}>
      <EOSD />
      <Links />
    </div>
  )
}