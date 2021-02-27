import Image from 'next/image'
import styles from '../styles/ProfileInfo.module.css'
import Button from 'react-bootstrap/Button'
import {useEffect, useState, useContext} from 'react'
import {UserContext} from '../src/UserContext'

export default function ProfileInfo({user, totalFollowing, totalFollowers}) {    
    const { user: loggedInUser } = useContext(UserContext)
    const [self, setIsSelf] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (loggedInUser != null){
            if (user.id == loggedInUser.id){
                setIsSelf(true)        
                setIsFollowing(false)
            }            
            else{
                fetch(`http://localhost/favolog.service/api/user/${loggedInUser.id}/isFollowing/${user.id}`)
                    .then(response => response.json())
                    .then(data => setIsFollowing(data))  
            }
        }        
    }, [loggedInUser])
    
    const onButtonClick = async () => {    
        const userFollow = {
            userId:user.id,
            followerId: loggedInUser.id
        }
        
        fetch(`http://localhost/favolog.service/api/user/follow`, {
            method: "POST",
            headers: {            
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFollow)
    })      
      .then(() => setIsFollowing(!isFollowing))
    }

    return <div className={styles.profileInfo}>
        {user.profileImage ? <span> <Image
                src={`https://favostorage.blob.core.windows.net/profileimages/${user.profileImage}`}
                layout="fixed"
                objectFit = "cover"
                objectPosition = "top"
                width="150"
                height="150"
                quality={100}                        
            /></span>
        : <div className={styles.profilePlaceholder}><span> {user.username.substring(0, 1).toUpperCase()} </span> </div> }
        <div className={styles.profileDetails}>
            <h3> {user.username} </h3>
            {user.first && <span> {user.firstName} </span>}
            {user.lastName && <span> {user.lastName} </span>}
            {user.website && <a href='user.website'> {user.website} </a>}
            {user.bio && <span> {user.bio} </span>}
            <span className={styles.followInfo}>{totalFollowing} following | {totalFollowers} followers</span>
        </div>
        <div>{!self && <Button size='sm' variant="secondary" onClick={onButtonClick}> {isFollowing 
        ? 'Unfollow': 'Follow'} </Button>}</div>
    </div>    
}
