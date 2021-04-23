import styles from '@/styles/ProfileInfo.module.css'
import CatalogsGrid from '@/components/catalog/CatalogsGrid'
import ProfileInfo from '@/components/user/ProfileInfo'
import { PageContext } from '@/src/PageContext'
import { AuthContext } from '@/src/AuthContext'
import { useContext, useEffect } from 'react'
import useSWR, { useSWRInfinite } from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ItemsGrid from '@/components/item/ItemsGrid'
import { useRouter } from 'next/router'

export default function Page({ username }) {
  const { setOpenGraphInfo, openGraphInfo } = useContext(PageContext)
  const { currentUser, getToken } = useContext(AuthContext)
  const router = useRouter()

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
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}/private`
    fetcher = fetchPrivate
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}/public`
    fetcher = fetchPublic
  }

  const { data, error } = useSWR(url, fetcher)

  const PAGE_SIZE = 12

  const { data: items, error: itemsError, size, setSize } = useSWRInfinite(
    (index) =>
      `${
        process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL
      }/feed/profile/${username}?pageSize=${PAGE_SIZE}&pageIndex=${index + 1}`,
    fetcher
  )

  useEffect(() => {
    if (data) {
      const image = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${data.user.profileImage}`
      setOpenGraphInfo({
        ...openGraphInfo,
        image,
        title: `${data.user.username} - Favolog `,
        url: `${process.env.NEXT_PUBLIC_REDIRECTURI}/${data.user.username}`,
      })
    }
  }, [data])

  const isLoadingInitialData = !items && !itemsError
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && items && typeof items[size - 1] === 'undefined')
  const isEmpty = items?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (items && items[items.length - 1]?.length < PAGE_SIZE)

  const feed = items ? [].concat(...items) : []

  if (error) return <div>failed to load </div>
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
            <ProfileInfo user={data.user} />
          </div>
        </div>
      </div>
      <div className={styles.profileMobile + ' mobile card'}>
        <span className='button' onClick={() => router.back()}>
          <img src='/icons/arrow_back-24px.svg' /> Back
        </span>
        <br />
        <ProfileInfo user={data.user} />
      </div>
      <div className='card mainContent'>
        <span className='button' onClick={() => router.back()}>
          <img src='/icons/arrow_back-24px.svg' /> Back
        </span>
        <br />
        <Tabs
          defaultActiveKey='catalogs'
          transition={false}
          id='noanim-tab-example'
        >
          <Tab eventKey='catalogs' title='Catalogs'>
            <CatalogsGrid catalogs={data.catalogs} />
          </Tab>
          {feed && (
            <Tab eventKey='items' title='All items'>
              <ItemsGrid items={feed} />
              {!isReachingEnd && (
                <span className='center'>
                  <button
                    disabled={isLoadingMore || isReachingEnd}
                    className='secondary'
                    onClick={() => setSize(size + 1)}
                  >
                    {isLoadingMore ? 'Loading...' : 'Load more'}
                  </button>
                </span>
              )}
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      username: params.username,
    },
  }
}
