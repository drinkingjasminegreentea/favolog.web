import styles from '../../styles/CatalogStyles.module.css'
import ItemCard from '../../components/item/ItemCard'
import CatalogMenu from '../../components/catalog/CatalogMenu'
import ProfileIcon from '../../components/user/ProfileIcon'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../src/UserContext'
import { PageContext } from '../../src/PageContext'
import useSWR from 'swr'

export default function Page({ catalogId, refreshKey }) {
  const { setActivePage } = useContext(PageContext)
  const { user, acquireToken } = useContext(UserContext)
  const [key, setKey] = useState(refreshKey)

  const fetchPublic = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response)
      })
      .catch((error) => {
        console.log('Something went wrong.', error)
      })
  }

  const fetchPrivate = (url) => {
    return acquireToken().then((accessToken) => {
      return fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) return response.json()
          return Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  let url = null
  let fetcher = null

  if (user) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}`
    fetcher = fetchPrivate
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}/public`
    fetcher = fetchPublic
  }

  const { data, error, mutate } = useSWR(url, fetcher)

  useEffect(() => {
    setActivePage('')
  }, [])

  if (key != refreshKey) mutate()

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      <div className={styles.catalogHeader}>
        <h4> {data.name} </h4>
        {data.isEditable ? (
          <CatalogMenu catalog={data} />
        ) : (
          <Link href={`/${data.user.username}`}>
            <a className='button'>
              <ProfileIcon
                profileImage={data.user.profileImage}
                username={data.user.username}
              />
            </a>
          </Link>
        )}
      </div>
      <div className={styles.catalog}>
        {data.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            catalogId={data.id}
            isEditable={data.isEditable}
            user={data.user}
          />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps({ params, query }) {
  return {
    props: {
      catalogId: params.id,
      refreshKey: query.refreshKey || '',
    },
  }
}
