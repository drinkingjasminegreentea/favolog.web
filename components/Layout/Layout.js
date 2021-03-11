import styles from '../../styles/Layout.module.css'
import SettingsMenu from './SettingsMenu'
import AddCatalog from '../catalog/AddCatalog'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../../src/UserContext'
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react'

const Logo = () => {
  return (
    <Link href='/'>
      <span className={'button ' + styles.logo}> FAVOLOG </span>
    </Link>
  )
}

export default function Layout({ children }) {
  const { signIn } = useContext(UserContext)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Logo />
        <SearchBar />
      </div>
      <div className={styles.settings}>
        <AuthenticatedTemplate>
          <SettingsMenu />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <span className='button' onClick={signIn}>
            {' '}
            Sign In
          </span>
        </UnauthenticatedTemplate>
      </div>
      <div className={styles.content}>{children}</div>
      <AuthenticatedTemplate>
        <AddCatalog />
      </AuthenticatedTemplate>
    </div>
  )
}
