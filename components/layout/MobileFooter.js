import styles from '../../styles/MobileFooter.module.css'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../src/AuthContext'

export default function MobileFooter() {
  const { currentUser } = useContext(AuthContext)
  const [active, setActive] = useState('')
  const [homeImage, setHomeImage] = useState('')
  const [searchImage, setSearchImage] = useState('')
  const [addImage, setAddImage] = useState('')
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    setActive('home')
  }, [])

  useEffect(() => {
    active == 'home'
      ? setHomeImage('home-active.svg')
      : setHomeImage('home.svg')
    active == 'search'
      ? setSearchImage('search-active.svg')
      : setSearchImage('search.svg')
    active == 'add' ? setAddImage('plus-active.svg') : setAddImage('plus.svg')
    active == 'profile'
      ? setProfileImage('person-active.svg')
      : setProfileImage('person.svg')
  }, [active])

  const clickHandler = (e) => {
    setActive(e.target.id)
  }

  return (
    <div className={styles.footerMenu}>
      <Link href='/'>
        <div id='home' className='button' onClick={clickHandler}>
          <img
            id='home'
            src={`/icons/${homeImage}`}
            width='20'
            height='20'
            layout='fixed'
          />
        </div>
      </Link>
      <Link href='/'>
        <div id='search' className='button' onClick={clickHandler}>
          <img
            id='search'
            src={`/icons/${searchImage}`}
            width='25'
            height='25'
            layout='fixed'
          />
        </div>
      </Link>
      <Link href='/item/add'>
        <div id='add' className='button' onClick={clickHandler}>
          <img
            id='add'
            src={`/icons/${addImage}`}
            width='25'
            height='25'
            layout='fixed'
          />
        </div>
      </Link>
      <Link href={`/${currentUser.displayName}`}>
        <div id='profile' className='button' onClick={clickHandler}>
          <img
            id='profile'
            src={`/icons/${profileImage}`}
            width='25'
            height='25'
            layout='fixed'
          />
        </div>
      </Link>
    </div>
  )
}
