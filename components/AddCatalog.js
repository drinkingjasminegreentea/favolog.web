
import { useState} from 'react'
import { useMsal } from "@azure/msal-react";
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddCatalog({show, parentAction}){
    const { accounts } = useMsal();
    const [name, setName] = useState('')        
    const router = useRouter()        

    async function add(){
        const catalog = {
            name: name,
            audienceType: 1,
            externalId: accounts[0].localAccountId
        }
        
        await fetch(`http://localhost/favolog.service/api/catalog`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catalog)
        }).then(()=>{
          parentAction()
          setName('')
          router.push('/user')
        });
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
              <Button variant="primary" onClick={() => add()}>
                Add
              </Button>              
            </Modal.Footer>                
    </Modal>
    
}