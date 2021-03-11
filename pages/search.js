import Link from 'next/link'
import UserCard from '../components/user/UserCard'
import ProfileIcon from '../components/user/ProfileIcon'
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
      <h4>Users</h4>
      <div className={styles.catalog}>
        {results.users.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
      <br />
      <h4>Catalogs</h4>
      <div className={styles.catalog}>
        {results.catalogs.map((item) => (
          <div key={item.id}>
            <Link href={`/catalog/${item.id}`} key={item.id}>
              <span className='bold link'>{item.name}</span>
            </Link>
            <Link href={`/user/${item.user.id}`}>
              <div className={styles.catalogAuthor + ' link'}>
                <ProfileIcon
                  profileImage={item.user.profileImage}
                  firstName={item.user.firstName}
                />
                <span>
                  {item.user.firstName} {item.user.lastName}
                </span>
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
