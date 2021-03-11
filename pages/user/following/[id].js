import styles from '../../../styles/ProfileInfo.module.css'
import UserCard from '../../../components/UserCard'

export default function Page({users, username}) {  
  
  return <>    
    <h5>{username} is following</h5>
    <div className={styles.userGrid}>
      {users && users.map((user) => (        
        <UserCard key={user.id} user={user}/>
      ))}
    </div>
    </>
  }
  
  export async function getServerSideProps({params}) {
    const username = params.username    
    
    const users = await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}/following`)
                  .then(response => response.json())          

    return {
      props: {
        users, username
      }
    }
  }

  