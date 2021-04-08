import styles from '../../styles/CatalogStyles.module.css'
import ItemCard from '../../components/item/ItemCard'
import CatalogMenu from '../../components/catalog/CatalogMenu'
import ProfileImage from '../../components/user/ProfileImage'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../src/AuthContext'
import { PageContext } from '../../src/PageContext'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'

export default function Page({ catalogId, refreshKey }) {
  const {
    setActivePage,
    setOpenGraphInfo,
    openGraphInfo,
    setCurrentCatalogId,
  } = useContext(PageContext)
  const { currentUser, getToken } = useContext(AuthContext)
  const [key, setKey] = useState(refreshKey)

  useEffect(() => {
    setCurrentCatalogId(catalogId)
  }, [catalogId])

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
    return getToken().then((accessToken) => {
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

  if (currentUser) {
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

  if (key != refreshKey) {
    setKey(refreshKey)
    mutate()
  }

  useEffect(() => {
    if (data) {
      const image = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${data.user.profileImage}`
      setOpenGraphInfo({
        ...openGraphInfo,
        image,
        title: `${data.user.username} - ${data.name}`,
        url: `${process.env.NEXT_PUBLIC_REDIRECTURI}/catalog/${data.id}`,
      })
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />
  return (
    <>
      <div className={styles.catalogHeader}>
        <h3> {data.name} </h3>
        {data.isEditable ? (
          <CatalogMenu catalog={data} />
        ) : (
          <Link href={`/${data.user.username}`}>
            <a className='button'>
              <ProfileImage
                profileImage={data.user.profileImage}
                username={data.user.username}
                width='35'
                height='35'
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
