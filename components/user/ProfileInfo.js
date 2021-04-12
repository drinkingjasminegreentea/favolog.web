import ProfileImage from '../user/ProfileImage'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'
import styles from '../../styles/ProfileInfo.module.css'
import Follow from '../layout/Follow'

export default function ProfileInfo({ user, totalFollowing, totalFollowers }) {
  const { currentUser, getToken } = useContext(AuthContext)
  const [self, setIsSelf] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [totalFollowersState, setTotalFollowersSate] = useState(totalFollowers)
  let websiteUrl = null
  if (user.website) {
    if (
      !user.website.startsWith('http://') ||
      !user.website.startsWith('https://')
    )
      websiteUrl = `https://${user.website}`
    else websiteUrl = user.website
  }

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

  return (
    <div className='card'>
      <div className='center'>
        <ProfileImage
          profileImage={user.profileImage}
          username={user.username}
          width='120'
          height='120'
        />
      </div>
      <br />
      <h5 className='center'>{user.username}</h5>
      {!self && <Follow username={user.username} style='primary' />}
      {self && (
        <Link href='/settings'>
          <button className='secondary'>Edit profile</button>
        </Link>
      )}
      <br />
      {user.firstName && user.lastName && (
        <h4 className='center'>
          {user.firstName} {user.lastName}
        </h4>
      )}
      {user.bio && (
        <span>
          {user.bio} <br />
        </span>
      )}
      {websiteUrl && (
        <>
          <a href={websiteUrl} target='_blank' className='flex'>
            <Image src='/icons/link-45deg.svg' width='18' height='18' />
            <b>{user.website}</b>
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
