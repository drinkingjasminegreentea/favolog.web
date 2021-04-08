import Link from 'next/link'
import ProfileCard from '../components/user/ProfileCard'
import styles from '../styles/CatalogStyles.module.css'
import { PageContext } from '../src/PageContext'
import { useContext } from 'react'

export default function Page({ searchQuery, results }) {
  const { setActivePage } = useContext(PageContext)
  setActivePage(null)

  return (
    <div className={styles.searchResults}>
      <span>
        Search results <b>'{searchQuery}'</b>
      </span>
      <br />
      {results.users.length > 0 && <h4>Users</h4>}
      <div className={styles.catalog}>
        {results.users.map((item) => (
          <ProfileCard key={item.id} user={item} />
        ))}
      </div>
      <br />
      {results.catalogs.length > 0 && <h4>Catalogs</h4>}
      <div className={styles.catalog}>
        {results.catalogs.map((item) => (
          <div key={item.id}>
            <Link href={`/catalog/${item.id}`} key={item.id}>
              <h5 className='button'>{item.name}</h5>
            </Link>
            <Link href={`/user/${item.user.id}`}>
              <div className={styles.catalogAuthor + ' button'}>
                <ProfileImage
                  profileImage={item.user.profileImage}
                  username={item.user.username}
                />
                <h6>{item.user.username}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const searchQuery = query.q
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/Search?query=${searchQuery}`
  )
  const results = await res.json()

  return {
    props: {
      searchQuery,
      results,
    },
  }
}
