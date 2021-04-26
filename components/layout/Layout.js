import Image from 'next/image'
import styles from '../../styles/Layout.module.css'
import { PageContext } from '../../src/PageContext'
import Header from './Header'
import Add from './Add'
import Head from 'next/head'
import { useContext, useState } from 'react'
import SideBar from './SideBar'
import MobileFooter from './MobileFooter'
import { AuthContext } from '../../src/AuthContext'
import Settings from './Settings'

export default function Layout({ children }) {
  const { openGraphInfo } = useContext(PageContext)
  const { currentUser } = useContext(AuthContext)
  const [showSettings, setShowSettings] = useState(false)

  const onClick = () => {
    setShowSettings(true)
  }

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
        <title>favolog - share what you love</title>
      </Head>
      <div className={styles.container}>
        <span
          className={styles.hamburgerIcon + ' mobile button'}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Image src='/icons/list.svg' width='35' height='35' />
        </span>
        {<Settings show={showSettings} close={() => setShowSettings(false)} />}
        <Header />
        {!showSettings && (
          <div className={styles.pageContent}>
            <div className={styles.content}>
              {children}
              <SideBar />
            </div>
          </div>
        )}
        <Add /> {currentUser && <MobileFooter />}
      </div>
    </>
  )
}
