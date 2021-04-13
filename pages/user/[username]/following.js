import styles from '../../../styles/ProfileInfo.module.css'
import ProfileCard from '../../../components/user/ProfileCard'

export default function Page({ user }) {
  return (
    <div className='mainContent'>
      <b>{user.username} is following</b>
      <br />
      <div className={styles.userGrid}>
        {user.following.map((item) => (
          <ProfileCard key={item.id} user={item} />
        ))}
      </div>
    </div>
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
