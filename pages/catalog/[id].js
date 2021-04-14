import styles from '../../styles/CatalogStyles.module.css'
import ProfileImage from '../../components/user/ProfileImage'
import CatalogItemCard from '../../components/item/CatalogItemCard'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../src/AuthContext'
import { PageContext } from '../../src/PageContext'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import CatalogMenu from '../../components/catalog/CatalogMenu'
import Follow from '@/components/layout/Follow'

export default function Page({ catalogId, refreshKey }) {
  const { setOpenGraphInfo, openGraphInfo, setCurrentCatalogId } = useContext(
    PageContext
  )
  const { currentUser, getToken } = useContext(AuthContext)
  const [key, setKey] = useState(refreshKey)
  const [self, setIsSelf] = useState(false)

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
        console.error(error)
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
          console.error(error)
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

      if (currentUser) setIsSelf(data.user.username == currentUser.displayName)
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <div className='mainContent'>
        <Spinner className='loading' animation='grow' />
      </div>
    )
  return (
    <>
      <div className='leftBarContainer'>
        <div className='leftBar'>
          <div className='card'>
            {data.isEditable && <CatalogMenu catalog={data} />}
            <h5 className='bold'> {data.name} </h5>
            <br />
            <br />
            <Link href={`/${data.user.username}`}>
              <div className='center button'>
                <ProfileImage
                  profileImage={data.user.profileImage}
                  username={data.user.username}
                  width='100'
                  height='100'
                />
              </div>
            </Link>
            <br />
            <Link href={`/${data.user.username}`}>
              <b className='center button'>{data.user.username}</b>
            </Link>
            <br />
            {!self && !data.user.isFollowing && <Follow style='primary' />}
          </div>
        </div>
      </div>
      <div className='mainContent'>
        <div className='mobile card'>
          {data.isEditable && <CatalogMenu catalog={data} />}
          <h5 className='bold'> {data.name} </h5>
          <div className={styles.catalogAuthor}>
            <Link href={`/${data.user.username}`}>
              <div className='button'>
                <ProfileImage
                  profileImage={data.user.profileImage}
                  username={data.user.username}
                  width='50'
                  height='50'
                />
              </div>
            </Link>
            <Link href={`/${data.user.username}`}>
              <b className='button'>{data.user.username}</b>
            </Link>

            {!self && <Follow style='primary' />}
          </div>
        </div>
        {data.items.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            isEditable={data.isEditable}
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
