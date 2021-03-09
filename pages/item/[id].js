import styles from '../../styles/CatalogStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext, scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function Page({ itemId, catalogId }) {
  const [item, setItem] = useState(null)
  const { instance, accounts } = useMsal()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (accounts.length > 0 && user) {
      const account = accounts[0]

      instance.acquireTokenSilent({ account, scopes }).then((response) => {
        fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item/${itemId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${response.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setItem(data)
          })
      })
    }
  }, [user, accounts])

  return item ? (
    <div className={styles.itemPage}>
      <span>
        {catalogId && (
          <Link href={`/catalog/${catalogId}`}>
            <span className={'button ' + styles.rightAlign}>
              Back to catalog
            </span>
          </Link>
        )}
      </span>
      <h4>{item.title}</h4>
      <div className={styles.itemDetails}>
        <h5>Catalogs</h5>
        {item.catalogs.map((catalog) => (
          <Link key={catalog.id} href={`/catalog/${catalog.id}`}>
            <span className='button'> {catalog.name}</span>
          </Link>
        ))}
        <h5>Source</h5>
        <a href={item.url} target='_blank'>
          {item.urlDomain}
        </a>
        <h5>Comments</h5>
        {item.catalogItems.map((item) => (
          <span key={item.id}> {item.comments}</span>
        ))}
      </div>
      <Image
        src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
        layout='intrinsic'
        objectFit='contain'
        width='300'
        height='300'
        quality={100}
      />
    </div>
  ) : (
    <span> loading </span>
  )
}

export async function getServerSideProps({ params, query }) {
  return {
    props: {
      itemId: params.id,
      catalogId: query.catalogId || null,
    },
  }
}
