import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Settings.module.css'
import { UserContext } from '../src/UserContext'
import { useRouter } from 'next/router'
import uploadImage from '../src/UploadImage'

const DeleteProfile = ({ userId, show, parentAction }) => {
  const { signOut, acquireToken } = useContext(UserContext)

  async function deleteProfile() {
    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            signOut()
            parentAction()
          } else return Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder='Enter delete here'></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={() => deleteProfile()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

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

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setFirstName(user.firstName)
      setLastName(user.lastName || '')
      setEmailAddress(user.emailAddress || '')
      setBio(user.bio || '')
      setWebsite(user.website || '')
    }
  }, [user])

  const update = async () => {
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
          router.push(`/user/${user.id}`)
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
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            type='email'
            placeholder='Enter email'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />

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
