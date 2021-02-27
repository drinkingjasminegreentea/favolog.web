import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BlobServiceClient } from '@azure/storage-blob'
import {useContext, useEffect, useState} from 'react'
import styles from '../styles/Settings.module.css'
import {UserContext} from '../src/UserContext'
import { v4 as uuidv4 } from 'uuid'

export default function Page() {
    const { user, setUser } = useContext(UserContext)    
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')    
    const [emailAddress, setEmailAddress] = useState('')
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [file, setFile] = useState()

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
      const account = "favostorage";
      const sas = "?sv=2020-02-10&ss=b&srt=sco&sp=rwdlacx&se=2021-03-04T10:59:25Z&st=2021-02-27T02:59:25Z&spr=https&sig=cJlgbPx9oJKwzpj%2BNdWl98DF4kqjt0%2BuGfjYFxhGm3Q%3D";
      const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
      const containerClient = blobServiceClient.getContainerClient("profileimages")
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
        
        await fetch(`http://localhost/favolog.service/api/user`, {
            method: "PUT",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userUpdate)
        })
        .then(response => response.json())
        .then(data => setUser(data))
    }

    return (
        <>            
            <h1>Settings</h1> 
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
                <Button variant="primary" onClick={update}>
                    Save
                </Button>         
            </Form> 
        </>
    )
}

