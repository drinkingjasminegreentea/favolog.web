import styles from '../styles/ProfileInfo.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function UserCard({user}){    
    return (        
        <Link href={`/user/${user.username}`}><div className={styles.userCard + " " + commonStyles.button}>                                                
            {user.profileImage ? <span> <Image
                src={`https://favostorage.blob.core.windows.net/profileimages/${user.profileImage}`}
                layout="fixed"
                objectFit = "cover"
                objectPosition = "top"
                width="100"
                height="100"
                quality={100}                        
            /></span>
        : <div className={styles.profilePlaceholder}><span> {user.username.substring(0, 1).toUpperCase()} </span> </div> }
            <div className={styles.userInfo}>
                <h5> {user.username} </h5>
                <span> {user.firstName}  {user.lastName} </span>
                <span> {user.bio} </span>
            </div>            
        </div></Link>
    )
  }
  
  
  