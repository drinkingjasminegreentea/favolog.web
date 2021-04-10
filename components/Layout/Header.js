import styles from '../../styles/Header.module.css'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import Link from 'next/link'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link href='/'>
          <span className={styles.logo + ' button'}>favolog</span>
        </Link>
        <SearchBar />
        <NavigationMenu />
      </div>
    </div>
  )
}
