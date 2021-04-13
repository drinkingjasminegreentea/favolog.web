import styles from '../../../styles/ProfileInfo.module.css'
import ProfileCard from '../../../components/user/ProfileCard'

export default function Page({ user }) {
  return (
    <div className='mainContent'>
      <b>People following {user.username}</b>
      <br />
      <div className={styles.userGrid}>
        {user.followers.map((item) => (
          <ProfileCard key={item.id} user={item} />
        ))}
      </div>
    </div>
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
