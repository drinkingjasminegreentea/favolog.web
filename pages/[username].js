import styles from '../styles/CatalogStyles.module.css'
import CatalogCard from '../components/catalog/CatalogCard'
import ProfileInfo from '../components/user/ProfileInfo'
import { PageContext } from '../src/PageContext'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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
  const url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}/profile`
  const { data, error } = useSWR(url, fetcher)

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
