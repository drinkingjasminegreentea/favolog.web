import styles from '../styles/CatalogStyles.module.css'
import CatalogCard from '../components/catalog/CatalogCard'
import ProfileInfo from '../components/user/ProfileInfo'
import { PageContext } from '../src/PageContext'
import { useContext, useEffect } from 'react'
import useSWR, { useSWRInfinite } from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FeedItemCard from '../components/item/FeedItemCard'

export default function Page({ username }) {
  const { setActivePage, setOpenGraphInfo, openGraphInfo } = useContext(
    PageContext
  )

  useEffect(() => {
    setActivePage(null)
  }, [])

  const fetcher = (url) => {
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
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}/profile`,
    fetcher
  )

  useEffect(() => {
    if (data) {
      const image = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${data.user.profileImage}`
      setOpenGraphInfo({
        ...openGraphInfo,
        image,
        title: `${data.user.username} - Favolog`,
        url: `${process.env.NEXT_PUBLIC_REDIRECTURI}/${data.user.username}`,
      })
    }
  }, [data])

  const PAGE_SIZE = 12

  const { data: items, error: itemsError, size, setSize } = useSWRInfinite(
    (index) =>
      `${
        process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL
      }/feed/profile/${username}?pageSize=${PAGE_SIZE}&pageIndex=${index + 1}`,
    fetcher
  )

  const isLoadingInitialData = !items && !itemsError
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && items && typeof items[size - 1] === 'undefined')
  const isEmpty = items?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (items && items[items.length - 1]?.length < PAGE_SIZE)

  const feed = items ? [].concat(...items) : []

  if (error) return <div>failed to load </div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />

  return (
    <>
      <ProfileInfo
        user={data.user}
        totalFollowing={data.totalFollowing}
        totalFollowers={data.totalFollowers}
      />

      <Tabs
        defaultActiveKey='catalogs'
        transition={false}
        id='noanim-tab-example'
      >
        <Tab eventKey='catalogs' title='Catalogs' tabClassName='extraBold'>
          <div className={styles.catalog}>
            {data.catalogs &&
              data.catalogs.map((catalog) => (
                <CatalogCard key={catalog.id} catalog={catalog} />
              ))}
          </div>
        </Tab>
        {feed && (
          <Tab eventKey='items' title='All items' tabClassName='extraBold'>
            <div className='grid'>
              <div className={styles.catalog}>
                {feed.map((item) => (
                  <FeedItemCard key={item.id} item={item} />
                ))}
              </div>
              {!isReachingEnd && (
                <Button
                  disabled={isLoadingMore || isReachingEnd}
                  variant='secondary'
                  className={styles.loadMore}
                  onClick={() => setSize(size + 1)}
                >
                  {isLoadingMore ? 'Loading...' : 'Load more'}
                </Button>
              )}
            </div>
          </Tab>
        )}
      </Tabs>
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
