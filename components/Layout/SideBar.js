import styles from '../../styles/SideBar.module.css'
import Link from 'next/link'

export default function SideBar() {
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.sideBar}>
        <div className={styles.suggestions}></div>
        <div className={styles.sideMenu}>
          <Link href='/privacyPolicy'>Privacy Policy and Terms </Link> <br />
          <Link href='/about'>About Us </Link> <br />
          <Link href='/help'>Help </Link>
        </div>
      </div>
    </div>
  )
}
