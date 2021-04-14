import Link from 'next/link'
import ProfileCard from '../components/user/ProfileCard'
import ProfileImage from '../components/user/ProfileImage'
import styles from '../styles/CatalogStyles.module.css'

export default function Page() {
  return (
    <div className='mainContent'>
      <span>
        Search results <b>'{searchQuery}'</b>
      </span>
      <br />
      {results.users.length > 0 && <h4>Users</h4>}
      <div className={styles.searchResults}>
        {results.users.map((item) => (
          <ProfileCard key={item.id} user={item} />
        ))}
      </div>
      <br />
      {results.catalogs.length > 0 && <h4>Catalogs</h4>}
      <div className={styles.searchResults}>
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
}
