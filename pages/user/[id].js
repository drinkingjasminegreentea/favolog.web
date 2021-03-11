import styles from '../../styles/CatalogStyles.module.css'
import CatalogCard from '../../components/catalog/CatalogCard'
import ProfileInfo from '../../components/user/ProfileInfo'

export default function Page({ userProfile }) {
  const user = userProfile.user
  const catalogs = userProfile.catalogs

  return (
    <>
      <ProfileInfo
        user={user}
        totalFollowing={userProfile.totalFollowing}
        totalFollowers={userProfile.totalFollowers}
      />
      <div className={styles.catalog}>
        {catalogs &&
          catalogs.map((catalog) => (
            <CatalogCard key={catalog.id} catalog={catalog} />
          ))}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const userProfile = await fetch(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${params.id}/profile`
  ).then((response) => response.json())
  return {
    props: {
      userProfile,
    },
  }
}