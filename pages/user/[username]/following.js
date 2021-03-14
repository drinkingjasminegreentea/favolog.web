import styles from '../../../styles/ProfileInfo.module.css'
import UserCard from '../../../components/user/UserCard'

export default function Page({ user }) {
  return (
    <>
      <h5>{user.username} is following</h5>
      <div className={styles.userGrid}>
        {user.following.map((item) => (
          <UserCard key={item.id} user={item} />
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${params.username}/following`
  ).then((response) => response.json())

  return {
    props: {
      user,
    },
  }
}
