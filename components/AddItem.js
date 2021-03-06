import { useState} from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddItem({show, parentAction, catalogId}){    
    const [url, setUrl] = useState('')              
    const router = useRouter()       
    
    const onItemAdd = async() => {
      const item = {
        originalUrl: url,
        catalogId
      }
      
      await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, 
      {
        method: "POST",
        headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })     
      .then((response) => {
        if(!response.ok)
          router.push(`/item/add?catalogId=${catalogId}&url=${url}`)
      }) 
      .then(()=>{
        parentAction()
        setUrl('')        
        router.push(`/catalog/${catalogId}`)
      })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new item to catalog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Please enter the item Url</Form.Label>
          <Form.Control type="text" placeholder="Item page Url" value={url} onChange={e => setUrl(e.target.value)}/>                                
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={parentAction}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={onItemAdd}>
            Add
          </Button>              
        </Modal.Footer>                
    </Modal>    
}