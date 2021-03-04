import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BlobServiceClient } from '@azure/storage-blob'
import {useContext, useEffect, useState} from 'react'
import styles from '../styles/Settings.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import {UserContext} from '../src/UserContext'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

const DeleteProfile = ({username, show, parentAction}) => {
    const { signOut } = useContext(UserContext)           

    async function deleteProfile(){              
        fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}`,
        {
            method: "DELETE"            
        })        
        .then(()=>{
          signOut()
          parentAction()          
        })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
              <Modal.Title>Delete profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input placeholder='Enter delete here'></input>        
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={parentAction}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={() => deleteProfile()}>
                Delete
              </Button>              
            </Modal.Footer>                
    </Modal>
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

    useEffect(()=>{        
        if (user){
            setUsername(user.username)
            setFirstName(user.firstName || '')
            setLastName(user.lastName || '')
            setEmailAddress(user.emailAddress)
            setBio(user.bio || '')
            setWebsite(user.website || '')
        }        
    },[user])

    function getFileExtension(fileName){      
      const lastDot = fileName.lastIndexOf('.')
      return fileName.substring(lastDot)
    }

    async function uploadImage(){    
      const blobName = uuidv4() + getFileExtension(file.name)      
      const blobServiceClient = new BlobServiceClient(`https://${process.env.NEXT_PUBLIC_BLOBSTORAGEACCOUNT}.blob.core.windows.net${process.env.NEXT_PUBLIC_BLOBSTORAGESASKEY}`)
      const containerClient = blobServiceClient.getContainerClient(`${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}`)
      var options = {blobContentType:file.type}
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)         
      
      await blockBlobClient.uploadData(file, {blobHTTPHeaders: options})
      return blobName
    }
    
    const update = async () => {               
              
        const userUpdate = {
            id: user.id,
            username,
            firstName,
            lastName,
            emailAddress,
            bio,
            website
        }

        if (file){
            userUpdate.profileImage = await uploadImage()
        }
        
        await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
            method: "PUT",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userUpdate)
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .then(() => router.push(`/user/${username}`))
    }

    const [showDeleteProfile, setShowDeleteProfile] = useState(false);

    function toggleDeleteProfileModal(){
        setShowDeleteProfile(!showDeleteProfile)
    }

    return (
        <div className={styles.settingsPage}>            
            <h4>Edit Profile</h4> 
            <Form className={styles.settingsForm}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>                    

                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="text" placeholder="Bio" value={bio} onChange={e => setBio(e.target.value)}/>

                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)}/>

                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)}/>

                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/>

                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>

                    <Form.File accept="image/*" label="Profile image" onChange={e => setFile(event.target.files[0])}/>                                               
                </Form.Group>
                <Button variant="secondary" onClick={update}>
                    Save
                </Button>         
            </Form>            
            <span role='button' 
                        className={commonStyles.button + " " + styles.deleteProfile}
                        onClick={toggleDeleteProfileModal}>
                        Delete profile
            </span>
            <DeleteProfile username={username} show={showDeleteProfile} parentAction={(toggleDeleteProfileModal)}/>                                      
        </div>
    )
}

