import Image from 'next/image'

export default function Page({ item }) {       
    return <>  
    <h1>{item.title}</h1>
    <Image
          src={`https://favostorage.blob.core.windows.net/productimages/${item.imageName}`}
          layout="intrinsic"
          objectFit = "contain"
          width="300"
          height="300"
          quality={100}                        
      />
      <a href={item.url} target="_blank" > Link </a>      
    </>
}

export async function getServerSideProps({params}) {     
  const res = await fetch(`http://localhost/favolog.service/api/item/${params.id}`)  
  const item = await res.json()

  return {
    props: {
      item
    }
  }
}

