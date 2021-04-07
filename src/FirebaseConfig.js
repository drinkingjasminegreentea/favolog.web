import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!firebase.apps.length || firebase.apps.length == 0)
  firebase.initializeApp(config)

const app = firebase.app()

export const auth = app.auth()
export default app

// Configure FirebaseUI.
export const uiConfig = {
  signInFlow: 'popup',
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      const user = {
        displayName: authResult.user.displayName,
        emailAddress: authResult.user.email,
        externalId: authResult.user.uid,
        profileImage: authResult.user.photoURL,
      }
      authResult.user.getIdToken(true).then((token) => {
        fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
            return Promise.reject(response)
          })
          .then((data) => {
            if (
              data.username !== authResult.user.displayName ||
              data.profileImage !== authResult.user.photoURL
            ) {
              authResult.user
                .updateProfile({
                  displayName: data.username,
                  photoURL: data.profileImage,
                })
                .then(() => {
                  return
                })
            }
          })
          .catch((error) => {
            throw error
          })
      })
      return true
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
}
