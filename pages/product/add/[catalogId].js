import { useState } from 'react'
import { useRouter } from 'next/router'
import { BlobServiceClient } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'

export default function AddProduct({catalogId}) {
    const router = useRouter()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')    
    const [url, setUrl] = useState('')    
    const [comments, setComments] = useState('')

    function fileChangedHandler(event) {
      const file = event.target.files[0];      
      setImage(file);
    }

    function getFileExtension(fileName){      
      const lastDot = name.lastIndexOf('.');      
      return fileName.substring(lastDot + 1);
    }

    async function uploadImage(){

      const blobName = uuidv4() + getFileExtension(image.name);
      const account = "favostorage";
      const sas = "?sv=2020-02-10&ss=b&srt=sco&sp=rwdlacx&se=2021-02-23T07:19:17Z&st=2021-02-22T23:19:17Z&spr=https&sig=A3VNKR4HvYH8hrR4vwbFAXk0rwfSvjvLPbQ%2BAxoP5RQ%3D";
      const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);
      const containerClient = blobServiceClient.getContainerClient("productimages");
      var options = {blobContentType:image.type};
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);            
      
      await blockBlobClient.uploadData(image, {blobHTTPHeaders: options});
      return blobName;
    }
    
    async function add(){        
        const product = {
            url: url,            
            catalogId: catalogId,            
            comments: comments
        }
        
        await fetch(`http://localhost/favolog.service/api/product`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(router.push(`/catalog/${catalogId}`))
    }

    return <>
        <h1>Add product</h1>
        <div>
            <input onChange={e => setUrl(e.target.value) } value={url} placeholder='Url'></input>
            <br/>            
            <input onChange={e => setComments(e.target.value) } value={comments} placeholder='Comments'></input>
            <br/>            
            <button onClick={() => add() }>Save</button>
        </div>
    </>
  }

  export async function getServerSideProps({params}) {     
    
    return {
      props: {
        catalogId: params.catalogId
      }
    }
  }
