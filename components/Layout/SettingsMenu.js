import Link from 'next/link'
import styles from '../../styles/Layout.module.css'
import { useContext } from 'react'
import { UserContext } from '../../src/UserContext'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SettingsMenu() {
  const { user, signOut } = useContext(UserContext)

  return (
    <>
      {user && (
        <Link href={`/user/${user.id}`}>
          <span className='button'> {user.firstName} </span>
        </Link>
      )}
      <Dropdown className={styles.settingsIcon}>
        <Dropdown.Toggle as='a' bsPrefix='custom'>
          <img className='button' src={'/icons/settings.svg'} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href='/settings'>Edit Profile</Dropdown.Item>
          <Dropdown.Item href='/privacypolicy'>Privacy Policy</Dropdown.Item>
          <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
