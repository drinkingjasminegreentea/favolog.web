
import { useState} from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddItem({show, parentAction, catalogId}){    
    const [url, setUrl] = useState('')        
    const [comments, setComments] = useState('')      
    const router = useRouter() 
    
    const getOg = async(externalUrl) => {      
      const response = await fetch(`http://api.linkpreview.net/?key=f2c2ccd3eff523bc489b879cafafad74&q=${externalUrl}`)
      const result = await response.json()
      return result;
    }
    
    async function add(){            
      var pageOgInfo = await getOg(url)  
      
        const item = {
            url: pageOgInfo.url,            
            title: pageOgInfo.title,
            imageUrl: pageOgInfo.image,
            catalogId: catalogId,            
            comments: comments
        }
        
        await fetch(`http://localhost/favolog.service/api/item`, {
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
              <Button variant="primary" onClick={() => add()}>
                Add
              </Button>              
            </Modal.Footer>                
    </Modal>
    
}