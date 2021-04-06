import { createContext, useState, useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { auth, uiConfig } from './FirebaseConfig'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'

export const SignInModal = ({ show, parentAction }) => {
  return (
    <Modal show={show} onHide={parentAction} centered size='lg'>
      <Modal.Header closeButton>Log in to Favolog</Modal.Header>
      <Modal.Body>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Modal.Body>
    </Modal>
  )
}

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function logOut() {
    return auth.signOut()
  }

  function updateDisplayName(displayName) {
    return currentUser.updateDisplayName(displayName)
  }

  const getToken = async () => {
    if (!currentUser) throw 'user is not logged in'

    try {
      return await auth.currentUser.getIdToken(true)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    getToken,
    logOut,
    updateDisplayName,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
