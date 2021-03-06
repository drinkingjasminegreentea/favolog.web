import { useState} from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function EditCatalog({show, parentAction, catalog}){
    const [name, setName] = useState(catalog.name)              
    const router = useRouter()       
    
    const onSubmit = async() => {
      const item = {
        name: name, 
        id: catalog.id
      }
      
      await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, 
      {
        method: "PUT",
        headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      .then(()=>{
        parentAction()         
        router.push(`/catalog/${catalog.id}`)
      })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
              <Modal.Title>Edit catalog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" placeholder="Catalog name" value={name} onChange={e => setName(e.target.value)} required/>                                
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={parentAction}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={onSubmit}>
            Save
          </Button>              
        </Modal.Footer>                
    </Modal>    
}