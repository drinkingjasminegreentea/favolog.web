import { useState} from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddItem({show, parentAction, catalogId}){    
    const [url, setUrl] = useState('')        
    const [comments, setComments] = useState('')      
    const router = useRouter()       
    
    const onItemAdd = async() => {
      const item = {
        url, comments, catalogId
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
      .then(()=>{
        parentAction()
        setUrl('')
        setComments('')
        router.push(`/catalog/${catalogId}`)
      })
    }
    
    return <Modal show={show} onHide={parentAction} centered>
        <Modal.Header closeButton>
              <Modal.Title>Add new item to catalog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input onChange={e => setUrl(e.target.value) } value={url} placeholder='Item page Url'></input> <br/><br/>
                <textarea onChange={e => setComments(e.target.value) } value={comments} placeholder='Comments'></textarea>
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