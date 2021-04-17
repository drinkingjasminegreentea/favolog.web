import Link from 'next/link'
import ProfileCard from '../components/user/ProfileCard'
import ProfileImage from '../components/user/ProfileImage'
import styles from '../styles/CatalogStyles.module.css'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from 'react'
import { publicFetcher } from '../src/Fetcher'
import useSWR from 'swr'
import SearchBar from '@/components/layout/SearchBar'

export default function Page({ searchQuery }) {
  console.log({ searchQuery })
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (searchQuery) {
      setUrl(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/Search?query=${searchQuery}`
      )
    }
  }, [searchQuery])

  const { data, error } = useSWR(url, publicFetcher)

  if (error) return <div>failed to load</div>
  if (!data && url)
    return (
      <div className='mainContent'>
        <Spinner className='loading' animation='grow' />
      </div>
    )

  if (data)
    return (
      <div className='mainContent'>
        <div className='mobile'>
          <SearchBar />
        </div>
        <span>
          Search results <b>'{searchQuery}'</b>
        </span>
        <br />
        {data.users.length > 0 && <h4>Users</h4>}
        <div className={styles.searchResults}>
          {data.users.map((item) => (
            <ProfileCard key={item.id} user={item} />
          ))}
        </div>
        <br />
        {data.catalogs.length > 0 && <h4>Catalogs</h4>}
        <div className={styles.searchResults}>
          {data.catalogs.map((item) => (
            <div key={item.id}>
              <Link href={`/catalog/${item.id}`} key={item.id}>
                <h5 className='button'>{item.name}</h5>
              </Link>
              <Link href={`/user/${item.user.id}`}>
                <div className={styles.catalogAuthor + ' button'}>
                  <ProfileImage
                    profileImage={item.user.profileImage}
                    username={item.user.username}
                    width='35'
                    height='35'
                  />
                  <h6>{item.user.username}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className='mainContent mobile'>
      <SearchBar />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      searchQuery: query.q || '',
    },
  }
}
