import styles from '../../styles/Header.module.css'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../src/AuthContext'
import Dropdown from 'react-bootstrap/Dropdown'
import Link from 'next/link'
import Image from 'next/image'
import ProfileImage from '../user/ProfileImage'
import { SignInModal } from '../../src/AuthContext'

export default function NavigationMenu() {
  const { currentUser, logOut } = useContext(AuthContext)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  if (!currentUser)
    return (
      <>
        <button className={styles.login} onClick={toggleModalWindow}>
          LOG IN/SIGN UP
        </button>
        <SignInModal show={showModal} parentAction={toggleModalWindow} />
      </>
    )

  return (
    <div className={styles.navigation}>
      <Link href='/'>
        <span>
          <Image src='/icons/home.svg' width='23' height='23' layout='fixed' />
        </span>
      </Link>
      <Link href='/'>
        <span>
          <Image src='/icons/bell.svg' width='23' height='23' layout='fixed' />
        </span>
      </Link>

      <Dropdown drop='bottom'>
        <Dropdown.Toggle as='a' bsPrefix='custom' className='button'>
          <ProfileImage
            src={'/icons/settings.svg'}
            profileImage={currentUser.photoURL}
            username={currentUser.displayName}
            width='35'
            height='35'
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align='right'>
          <Dropdown.Item
            className={styles.dropDownMenuItem}
            onClick={() => router.push(`/${currentUser.displayName}`)}
          >
            <Image src='/icons/person.svg' width='20' height='20' />
            <span>Profile</span>
          </Dropdown.Item>
          <Dropdown.Item className={styles.dropDownMenuItem} onClick={logOut}>
            <Image src='/icons/box-arrow-left.svg' width='20' height='20' />
            <span>Log out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
