import { useContext, useState } from 'react'
import { AuthContext, SignInModal } from '../../src/AuthContext'
import styles from '../../styles/Header.module.css'
import NavigationMenu from './NavigationMenu'
import SearchBar from './SearchBar'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <div className={styles.headerContainer + ' desktop'}>
        <div className={styles.header}>
          <Link href='/'>
            <span className={styles.logo + ' button'}>
              <img src='/icons/gratipay-brands.svg' /> favolog
            </span>
          </Link>
          <SearchBar />
          <NavigationMenu />
        </div>
      </div>
      <div className={styles.headerContainer + ' mobile'}>
        <Link href='/'>
          <span className={styles.logo + ' button'}>
            <img src='/icons/gratipay-brands.svg' /> favolog
          </span>
        </Link>
        {!currentUser ? (
          <>
            <button className='primary' onClick={toggleModalWindow}>
              Log in
            </button>
            <SignInModal show={showModal} parentAction={toggleModalWindow} />
          </>
        ) : (
          <span className='end'>
            <Image src='/icons/list.svg' width='25' height='25' />
          </span>
        )}
      </div>
    </>
  )
}
