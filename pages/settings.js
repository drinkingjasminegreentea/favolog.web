import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Settings.module.css'
import { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from '../src/UserContext'
import { useRouter } from 'next/router'
import uploadImage from '../src/UploadImage'
import DeleteProfile from '../components/user/DeleteProfile'

export default function Page() {
  const { user, setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [file, setFile] = useState()
  const router = useRouter()
  const { acquireToken } = useContext(UserContext)

  const [errors, setErrors] = useState({})
  const usernameRef = useRef(null)
  const emailAddressRef = useRef(null)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setFirstName(user.firstName)
      setLastName(user.lastName || '')
      setEmailAddress(user.emailAddress || '')
      setBio(user.bio || '')
      setWebsite(user.website || '')
    }
    setErrors({})
  }, [user])

  const update = async () => {
    setErrors({})
    if (!username) {
      setErrors({ username: 'Username is required' })
      usernameRef.current.focus()
      return
    }

    if (username.length > 30) {
      setErrors({
        username:
          'Please enter unique username that is less than 30 characters',
      })
      usernameRef.current.focus()
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      setErrors({
        username: 'Username can contain only letters, numbers and underscore.',
      })
      usernameRef.current.focus()
      return
    }

    if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      setErrors({
        emailAddress: 'Please enter valid email address',
      })
      emailAddressRef.current.focus()
      return
    }

    const userUpdate = {
      id: user.id,
      username,
      firstName,
      lastName,
      emailAddress,
      bio,
      website,
      externalId: user.externalId,
    }

    if (file) {
      userUpdate.profileImage = await uploadImage(
        file,
        process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER
      )
    }

    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userUpdate),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else return Promise.reject(response)
        })
        .then((data) => {
          setUser(data)
          router.push(`/${user.username}`)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  const [showDeleteProfile, setShowDeleteProfile] = useState(false)

  function toggleDeleteProfileModal() {
    setShowDeleteProfile(!showDeleteProfile)
  }

  return (
    <div className={styles.settingsPage}>
      <h4>Edit Profile</h4>
      <Form className={styles.settingsForm}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameRef}
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors && errors.username && (
            <p className={styles.error}>{errors.username}</p>
          )}
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailAddressRef}
            type='email'
            placeholder='Enter email'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          {errors && errors.emailAddress && (
            <p className={styles.error}>{errors.emailAddress}</p>
          )}
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type='text'
            placeholder='Bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Form.Label>Website</Form.Label>
          <Form.Control
            type='text'
            placeholder='Website'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <Form.File
            accept='image/*'
            label='Profile image'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button variant='secondary' onClick={update}>
          Save
        </Button>
      </Form>
      <span
        role='button'
        className={'button ' + styles.deleteProfile}
        onClick={toggleDeleteProfileModal}
      >
        Delete profile
      </span>
      {user && (
        <DeleteProfile
          userId={user.id}
          show={showDeleteProfile}
          parentAction={toggleDeleteProfileModal}
        />
      )}
    </div>
  )
}
