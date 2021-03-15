import styles from '../../styles/Layout.module.css'
import { useContext } from 'react'
import { UserContext } from '../../src/UserContext'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import Image from 'next/image'
import ProfileIcon from '../user/ProfileIcon'
import { ActivePages, PageContext } from '../../src/PageContext'

export default function NavigationMenu() {
  const { user, signIn, signOut } = useContext(UserContext)
  const { activePage } = useContext(PageContext)
  let homeStyle = 'button'
  let exploreStyle = 'button'

  if (activePage == ActivePages.home) homeStyle = homeStyle + ' active'
  if (activePage == ActivePages.explore) exploreStyle = exploreStyle + ' active'

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
      {!user && (
        <Image
          src='/icons/person-circle.svg'
          width='25'
          height='25'
          layout='fixed'
          className='button'
          onClick={signIn}
        />
      )}
      {user && (
        <Dropdown drop='bottom' navbar='true'>
          <Dropdown.Toggle as='a' bsPrefix='custom'>
            <ProfileIcon
              className='button'
              src={'/icons/settings.svg'}
              profileImage={user.profileImage}
              username={user.username}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className={styles.dropDownMenu}>
            <Dropdown.Item href={`/${user.username}`}>
              <img src='/icons/person.svg' /> Profile
            </Dropdown.Item>
            <Dropdown.Item href='/settings'>
              <img src='/icons/gear-wide.svg' /> Settings
            </Dropdown.Item>
            <Dropdown.Item href='/privacypolicy'>
              <img src='/icons/shield-check.svg' />
              Privacy Policy
            </Dropdown.Item>
            <Dropdown.Item onClick={signOut}>
              <img src='/icons/box-arrow-left.svg' />
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  )
}
