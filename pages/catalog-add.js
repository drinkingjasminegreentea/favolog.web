import { useState } from 'react'

export default function User() {
    const [name, setName] = useState('')
    
    async function add(){
        const catalog = {
            name: name,
            audienceType: 1,
            userId: 1
        }
        
        const add = await fetch(`http://localhost/favolog.service/api/catalog`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(catalog)
        })
        
        const addResponse = await add.json()
        
        console.log(addResponse)
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