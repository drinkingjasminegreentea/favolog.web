import styles from '../../styles/Layout.module.css'
import { PageContext } from '../../src/PageContext'
import { AuthContext } from '../../src/AuthContext'
import Header from './Header'
import Add from './Add'
import Head from 'next/head'
import { useContext } from 'react'
import SideBar from './SideBar'

export default function Layout({ children }) {
  const { openGraphInfo } = useContext(PageContext)
  const { currentUser } = useContext(AuthContext)

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
        <title>Favolog - Share what you love</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <div className={styles.layout}>
          <div className={styles.content}>
            {children}
            <SideBar />
          </div>
        </div>
        {currentUser && <Add />}
      </div>
    </>
  )
}
