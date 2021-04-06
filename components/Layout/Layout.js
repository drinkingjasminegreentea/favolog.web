import styles from '../../styles/Layout.module.css'
import NavigationMenu from './NavigationMenu'
import Add from './Add'
import SearchBar from './SearchBar'
import Link from 'next/link'
import Head from 'next/head'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { PageContext } from '../../src/PageContext'
import { useContext } from 'react'

const Logo = () => {
  return (
    <Link href='/'>
      <span className={'button ' + styles.logo}>favolog</span>
    </Link>
  )
}

export default function Layout({ children }) {
  const { openGraphInfo } = useContext(PageContext)

  return (
    <>
      <Head>
        {/* Open Graph */}
        <meta property='og:url' content={openGraphInfo.url} key='ogurl' />
        <meta property='og:image' content={openGraphInfo.image} key='ogimage' />
        <meta property='og:title' content={openGraphInfo.title} key='ogtitle' />
        <meta
          property='og:description'
          content={openGraphInfo.description}
          key='ogdesc'
        />
        <meta property='og:image:width' content='300' />
        <meta property='og:image:height' content='300' />
        <title>Favolog - Share your favorites</title>
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
