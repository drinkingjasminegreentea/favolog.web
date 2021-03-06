import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function DeleteCatalogItem({show, parentAction, catalogId, itemId}){        
    const router = useRouter()       
    
    const onSubmit = async() => {      
      
      await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}/item/${itemId}`, {
        method: "DELETE"
      })
      .then(()=>{
        parentAction()
        router.push(`/catalog/${catalogId}`)
      })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
              <Modal.Title>Delete item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={parentAction}>
                Cancel
              </Button>
              <Button variant="secondary" onClick={onSubmit}>
                Delete
              </Button>              
            </Modal.Footer>                
    </Modal>    
}