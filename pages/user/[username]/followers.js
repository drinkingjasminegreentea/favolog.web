import styles from '../../../styles/ProfileInfo.module.css'
import UserCard from '../../../components/user/UserCard'

export default function Page({ user }) {
  return (
    <>
      <h5>People following {user.username}</h5>
      <div className={styles.userGrid}>
        {user.followers.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${params.username}/followers`
  ).then((response) => response.json())

  return {
    props: {
      user,
    },
  }
}
