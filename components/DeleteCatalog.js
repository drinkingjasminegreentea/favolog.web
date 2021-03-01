import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import {UserContext} from '../src/UserContext'

export default function DeleteCatalog({show, parentAction, catalogId}){    
    const {user} = useContext(UserContext)    
    const router = useRouter()       
    
    const onItemAdd = async() => {      
      
      await fetch(`http://localhost/favolog.service/api/catalog/${catalogId}`, {
        method: "DELETE"
      })
      .then(()=>{
        parentAction()
        router.push(`/user/${user.username}`)
      })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
              <Modal.Title>Delete catalog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this catalog?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={parentAction}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={onItemAdd}>
                Delete
              </Button>              
            </Modal.Footer>                
    </Modal>    
}