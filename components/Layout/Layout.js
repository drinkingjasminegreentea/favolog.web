import styles from '../../styles/Layout.module.css'
import NavigationMenu from './NavigationMenu'
import Add from './Add'
import SearchBar from './SearchBar'
import Link from 'next/link'
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
          <Add />
        </AuthenticatedTemplate>
      </div>
    </>
  )
}
