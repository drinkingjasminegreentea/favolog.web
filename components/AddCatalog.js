import { useState, useContext} from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import {UserContext} from '../src/UserContext'

export default function AddCatalog({show, parentAction}){
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')        
  const router = useRouter()        

  async function add(){
      const catalog = {
          name: name,
          audienceType: 1,
          userId: user.id
      }
            
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, 
      {
          method: "POST",
          headers: {            
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(catalog)
      })
      .then(response => response.json())
      .then((newCatalog)=>{
        parentAction()
        setName('')
        router.push(`/catalog/${newCatalog.id}`)
      })
  }  
  
  return <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
            <Modal.Title>Create a new catalog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <input onChange={e => setName(e.target.value) } value={name} placeholder='Name your catalog'></input>        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={parentAction}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => add()}>
              Add
            </Button>              
          </Modal.Footer>                
  </Modal>
    
}