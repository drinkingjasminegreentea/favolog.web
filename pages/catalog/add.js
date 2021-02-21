import { useState } from 'react'
import { useMsal } from "@azure/msal-react";
import { useRouter } from 'next/router'

export default function CatalogAdd() {
    const { accounts } = useMsal();
    const [name, setName] = useState('')    
    const [audienceType, setAudienceType] = useState('')    
    const router = useRouter()

    async function add(){
        const catalog = {
            name: name,
            audienceType: 1,
            uniqueExternalId: accounts[0].localAccountId
        }
        
        await fetch(`http://localhost/favolog.service/api/catalog`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catalog)
        }).then(()=>{router.push("/catalog")});
    }    

    return <>
        <h1>Create a new catalog</h1>
        <div>
            <input onChange={e => setName(e.target.value) } value={name} placeholder='Name your catalog'></input>
            <br/>
            <button onClick={() => add() }>Save</button>
        </div>
    </>
  }