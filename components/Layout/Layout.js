import styles from '../../styles/Layout.module.css'
import NavigationMenu from './NavigationMenu'
import AddCatalog from '../catalog/AddCatalog'
import SearchBar from './SearchBar'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../../src/UserContext'
import Head from 'next/head'
import { AuthenticatedTemplate } from '@azure/msal-react'

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
    <>
      <Head>
        <title>Favolog</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Logo />
          <SearchBar />
          <NavigationMenu />
        </div>
        <div className={styles.content}>{children}</div>
        <AuthenticatedTemplate>
          <AddCatalog />
        </AuthenticatedTemplate>
      </div>
    </>
  )
}
