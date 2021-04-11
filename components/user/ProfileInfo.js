import ProfileImage from '../user/ProfileImage'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'
import styles from '../../styles/ProfileInfo.module.css'

export default function ProfileInfo({ user, totalFollowing, totalFollowers }) {
  const { currentUser, getToken } = useContext(AuthContext)
  const [self, setIsSelf] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [totalFollowersState, setTotalFollowersSate] = useState(totalFollowers)

  useEffect(() => {
    if (currentUser) {
      if (user.username == currentUser.displayName) {
        setIsSelf(true)
        setIsFollowing(false)
      } else {
        getToken().then((accessToken) => {
          fetch(
            `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${currentUser.displayName}/isFollowing/${user.username}`,
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
    } else {
      setIsSelf(false)
    }
  }, [user, currentUser])

  const onButtonClick = async () => {
    const userFollow = {
      username: user.username,
      followerUsername: currentUser.displayName,
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
      })
        .then((response) => {
          if (response.ok) {
            isFollowing
              ? setTotalFollowersSate(totalFollowersState - 1)
              : setTotalFollowersSate(totalFollowersState + 1)
            setIsFollowing(!isFollowing)
          } else Promise.reject()
        })
        .catch((error) => console.error(error))
    })
  }

  return (
    <div className='card'>
      <ProfileImage
        profileImage={user.profileImage}
        username={user.username}
        width='120'
        height='120'
      />
      <br />
      <h5>{user.username}</h5>
      <div className={styles.profileButtons}>
        {!self && (
          <button className='primary' onClick={onButtonClick}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        )}
        {self && (
          <Link href='/settings'>
            <button className='primary'>Edit profile</button>
          </Link>
        )}
      </div>
      <br />
      {user.firstName && user.lastName && (
        <h4>
          {user.firstName} {user.lastName}
        </h4>
      )}
      {user.bio && (
        <span>
          {user.bio} <br />
        </span>
      )}
      {user.website && (
        <>
          <a href={user.website} className='link'>
            {user.website}
          </a>
        </>
      )}
      <br />
      <div className={styles.profileStats}>
        <Link href={`/user/${user.username}/following`}>
          <span className='button'>
            <b>{totalFollowing}</b> following
          </span>
        </Link>
        &nbsp; &nbsp;
        <Link href={`/user/${user.username}/followers`}>
          <span className='button'>
            <b>{totalFollowersState}</b> followers
          </span>
        </Link>
        <br />
        <span>
          <b>20</b> catalogs
        </span>
        &nbsp; &nbsp;
        <span>
          <b>140</b> items
        </span>
      </div>
    </div>
  )
}
