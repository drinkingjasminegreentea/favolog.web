import styles from '../../styles/Header.module.css'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href='/'>
        <span className={styles.logo + ' button'}>
          <Image
            src='/images/logo.png'
            width='200'
            height='70'
            objectFit='contain'
            quality='100'
          />
        </span>
      </Link>
      <SearchBar />
      <NavigationMenu />
    </div>
  )
}
