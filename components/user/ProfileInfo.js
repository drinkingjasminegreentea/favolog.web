import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/ProfileInfo.module.css'
import Button from 'react-bootstrap/Button'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'

export default function ProfileInfo({ user, totalFollowing, totalFollowers }) {
  const { currentUser, getToken } = useContext(AuthContext)
  const [self, setIsSelf] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [totalFollowersState, setTotalFollowersSate] = useState(totalFollowers)

  useEffect(() => {
    if (currentUser) {
      if (user.id == currentUser.id) {
        setIsSelf(true)
        setIsFollowing(false)
      } else {
        getToken().then((accessToken) => {
          fetch(
            `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${currentUser.id}/isFollowing/${user.id}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => setIsFollowing(data))
        })
      }
    }
  }, [currentUser])

  const onButtonClick = async () => {
    const userFollow = {
      userId: user.id,
      followerId: currentUser.id,
    }

    getToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/follow`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userFollow),
      }).then(() => {
        isFollowing
          ? setTotalFollowersSate(totalFollowersState - 1)
          : setTotalFollowersSate(totalFollowersState + 1)
        setIsFollowing(!isFollowing)
      })
    })
  }

  return (
    <div className={styles.profileInfo}>
      {user.profileImage ? (
        <span>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${user.profileImage}`}
            layout='fixed'
            objectFit='cover'
            objectPosition='top'
            width='150'
            height='150'
            quality={100}
          />
        </span>
      ) : (
        <div className={styles.profilePlaceholder}>
          <span> {user.username.substring(0, 1).toUpperCase()} </span>
        </div>
      )}
      <div className={styles.profileDetails}>
        <h4 className='light'>
          {user.firstName} {user.lastName}
        </h4>
        <h5>{user.username}</h5>
        <Link href={`/user/${user.username}/following`}>
          <span className={styles.followInfo + ' button'}>
            {totalFollowing} following
          </span>
        </Link>
        &nbsp; | &nbsp;
        <Link href={`/user/${user.username}/followers`}>
          <span className={styles.followInfo + ' button'}>
            {totalFollowersState} followers
          </span>
        </Link>
        <br />
        {user.bio && <span> {user.bio} </span>}
        {user.website && (
          <a href={user.website} className='link'>
            {user.website}
          </a>
        )}
      </div>
      <div className={styles.profileButtons}>
        {!self && currentUser && (
          <Button variant='secondary' onClick={onButtonClick}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
        {self && (
          <Link href='/settings'>
            <Button variant='secondary'>Edit profile</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
