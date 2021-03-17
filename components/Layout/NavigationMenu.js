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
        <Dropdown drop='bottom'>
          <Dropdown.Toggle as='a' bsPrefix='custom'>
            <Image
              src='/icons/person-circle.svg'
              width='25'
              height='25'
              layout='fixed'
              className='button'
            />
          </Dropdown.Toggle>

          <Dropdown.Menu align='right'>
            <Dropdown.Item
              className={styles.dropDownMenuItem}
              href='/privacypolicy'
            >
              <Image src='/icons/shield-check.svg' width='20' height='20' />
              <span>Privacy Policy</span>
            </Dropdown.Item>
            <Dropdown.Item className={styles.dropDownMenuItem} onClick={signIn}>
              <Image
                src='/icons/box-arrow-in-right.svg'
                width='20'
                height='20'
              />
              <span>Sing Up / Sign In</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {user && (
        <Dropdown drop='bottom'>
          <Dropdown.Toggle as='a' bsPrefix='custom'>
            <ProfileIcon
              src={'/icons/settings.svg'}
              profileImage={user.profileImage}
              username={user.username}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu align='right'>
            <Dropdown.Item
              className={styles.dropDownMenuItem}
              href={`/${user.username}`}
            >
              <Image src='/icons/person.svg' width='20' height='20' />
              <span>Profile</span>
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropDownMenuItem}
              href='/privacypolicy'
            >
              <Image src='/icons/shield-check.svg' width='20' height='20' />
              <span>Privacy Policy</span>
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.dropDownMenuItem}
              onClick={signOut}
            >
              <Image src='/icons/box-arrow-left.svg' width='20' height='20' />
              <span>Sign out</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  )
}
