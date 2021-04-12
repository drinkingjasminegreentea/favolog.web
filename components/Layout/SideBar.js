import styles from '../../styles/SideBar.module.css'
import Link from 'next/link'

export default function SideBar() {
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.sideBar}>
        <div className={styles.suggestions}></div>
        <div className={styles.sideMenu}>
          <Link href='/privacypolicy'>
            <span className='button'>Privacy Policy and Terms</span>
          </Link>
          <br />
          <Link href='/about'>
            <span className='button'>About Us </span>
          </Link>
          <br />
          <Link href='/help'>
            <span className='button'>Help </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
