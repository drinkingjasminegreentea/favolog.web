import Image from 'next/image'
import styles from '../styles/ProfileInfo.module.css'
import Button from 'react-bootstrap/Button'

export default function ProfileInfo({user}) {    
    return <div className={styles.profileInfo}>
        {user.profileImage ? <span> <Image
                src={`https://favostorage.blob.core.windows.net/profileimages/${user.profileImage}`}
                layout="intrinsic"
                objectFit = "contain"
                width="150"
                height="150"
                quality={100}                        
            /></span> 
        : <div className={styles.profilePlaceholder}><span> {user.username.substring(0, 1).toUpperCase()} </span> </div> }
        <div>
            <h3> {user.username} </h3>
            {user.first && <span> {user.firstName} </span>}
            {user.lastName && <span> {user.lastName} </span>}
            {user.website && <a href='user.website'> {user.website} </a>}
            {user.bio && <span> {user.bio} </span>}
        </div>
        <div>
        <Button size='sm' variant="secondary"> Follow </Button>        
        </div>        
    </div>    
} 
  