import styles from '../../styles/Layout.module.css'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '../../src/UserContext'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import Image from 'next/image'
import ProfileIcon from '../user/ProfileIcon'
import { ActivePages, PageContext } from '../../src/PageContext'

export default function NavigationMenu() {
  const { user, signIn, signOut } = useContext(UserContext)
  const router = useRouter()
  const { activePage } = useContext(PageContext)
  let homeStyle = 'button'
  let exploreStyle = 'button'

  if (activePage == ActivePages.home) homeStyle = homeStyle + ' active'
  if (activePage == ActivePages.explore) exploreStyle = exploreStyle + ' active'

  if (!user)
    return (
      <div className={styles.signIn}>
        <Button variant='secondary' onClick={signIn}>
          Sign In
        </Button>
      </div>
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
            profileImage={user.profileImage}
            username={user.username}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu align='right'>
          <Dropdown.Item
            className={styles.dropDownMenuItem}
            onClick={() => router.push(`/${user.username}`)}
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
          <Dropdown.Item className={styles.dropDownMenuItem} onClick={signOut}>
            <Image src='/icons/box-arrow-left.svg' width='20' height='20' />
            <span>Sign out</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
