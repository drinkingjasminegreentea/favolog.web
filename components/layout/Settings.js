import { useContext, useEffect, useState } from 'react'
import styles from '@/styles/Settings.module.css'
import { AuthContext, SignInModal } from '@/src/AuthContext'
import Link from 'next/link'

export default function Settings({ show, close }) {
  const { currentUser, logOut } = useContext(AuthContext)
  const [active, setIsActive] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  const toggleShowLogin = () => {
    setShowLogin(!showLogin)
  }

  useEffect(() => {
    if (show) setIsActive(styles.active)
    else setIsActive('')
  }, [show])

  const logOutHandler = () => {
    close()
    logOut()
  }

  const logInHandler = () => {
    close()
    toggleShowLogin()
  }

  return (
    <>
      <div className={styles.container + ' ' + active}>
        <div className={styles.menu}>
          {!currentUser && (
            <>
              <span onClick={logInHandler}>
                <img src='/icons/box-arrow-in-right.svg' /> Log In
              </span>
              <SignInModal show={showLogin} parentAction={toggleShowLogin} />
            </>
          )}
          <Link href='/about'>
            <span onClick={close}>
              <img src='/icons/info-circle.svg' /> About Us
            </span>
          </Link>
          <Link href='/help'>
            <span onClick={close}>
              <img src='/icons/question-circle.svg' /> Help Center
            </span>
          </Link>
          <Link href='/privacypolicy'>
            <span onClick={close}>
              <img src='/icons/shield-check.svg' /> Privacy Policy
            </span>
          </Link>
          {currentUser && (
            <span onClick={logOutHandler}>
              <img src='/icons/box-arrow-left.svg' /> Log Out
            </span>
          )}
        </div>
      </div>
    </>
  )
}
