import Link from 'next/link'
import UserCard from '../components/user/UserCard'
import styles from '../styles/CatalogStyles.module.css'

export default function Page({ searchQuery, results }) {
  return (
    <div className={styles.searchResults}>
      <span>
        Search results <b>'{searchQuery}'</b>
      </span>
      <h2>Users</h2>
      <div className={styles.catalog}>
        {results.users.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
      <h2>Catalogs</h2>
      <div className={styles.catalog}>
        {results.catalogs.map((item) => (
          <Link href={`/catalog/${item.id}`} key={item.id}>
            <span>{item.Name}</span>
          </Link>
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
