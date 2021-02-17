import { useState } from 'react'
import { useRouter } from 'next/router'
export default function AddProduct({catalogId}) {
    const router = useRouter()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')

    async function add(){
        const product = {
            name: name,
            brand: brand,
            catalogId: catalogId
        }
        
        await fetch(`http://localhost/favolog.service/api/product`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(router.push('/user/raihan'))
    }

    return <>
        <h1>Add product</h1>
        <div>
            <input onChange={e => setName(e.target.value) } value={name} placeholder='Name'></input>
            <br/>
            <input onChange={e => setBrand(e.target.value) } value={brand} placeholder='Brand'></input>
            <br/>
            <button onClick={() => add() }>Save</button>
        </div>
    </>
  }

  export async function getServerSideProps(context) {
      
    return {
      props: {
        catalogId: context.query.catalogId
      }
    }
  }
