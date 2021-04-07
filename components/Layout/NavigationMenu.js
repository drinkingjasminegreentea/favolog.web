import styles from '../../styles/Layout.module.css'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../src/AuthContext'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import Image from 'next/image'
import ProfileIcon from '../user/ProfileIcon'
import { ActivePages, PageContext } from '../../src/PageContext'
import { SignInModal } from '../../src/AuthContext'

export default function NavigationMenu() {
  const { currentUser, logOut } = useContext(AuthContext)
  const router = useRouter()
  const { activePage } = useContext(PageContext)
  let homeStyle = 'button'
  let exploreStyle = 'button'
  const [profileImage, setProfileImage] = useState('')
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)

  if (activePage == ActivePages.home) homeStyle = homeStyle + ' activePage'
  if (activePage == ActivePages.explore)
    exploreStyle = exploreStyle + ' activePage'

  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.photoURL)
      setUsername(currentUser.displayName)
    }
  }, [currentUser])

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  if (!currentUser)
    return (
      <>
        <div className={styles.signIn}>
          <Button variant='secondary' onClick={toggleModalWindow}>
            Log In
          </Button>
        </div>
        <SignInModal show={showModal} parentAction={toggleModalWindow} />
      </>
    )

  return (
    <div className={styles.navigation}>
      <Link href='/explore'>
        <span className={exploreStyle}>
          <Image
            src='/icons/explore.svg'
            width='25'
            height='25'
            layout='fixed'
          />
        </span>
      </Link>
      <Link href='/'>
        <span className={homeStyle}>
          <Image src='/icons/home.svg' width='25' height='25' layout='fixed' />
        </span>
      </Link>

      <Dropdown drop='bottom'>
        <Dropdown.Toggle as='a' bsPrefix='custom'>
          <ProfileIcon
            src={'/icons/settings.svg'}
            profileImage={profileImage}
            username={username}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align='right'>
          <Dropdown.Item
            className={styles.dropDownMenuItem}
            onClick={() => router.push(`/${username}`)}
          >
            <Image src='/icons/person.svg' width='20' height='20' />
            <span>Profile</span>
          </Dropdown.Item>

          <Dropdown.Item
            className={styles.dropDownMenuItem}
            onClick={() => router.push('/privacypolicy')}
          >
            <Image src='/icons/shield-check.svg' width='20' height='20' />
            <span>Privacy Policy</span>
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
