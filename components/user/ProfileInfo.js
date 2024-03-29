import ProfileImage from '../user/ProfileImage'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'
import styles from '../../styles/ProfileInfo.module.css'
import Follow from '@/components/layout/Follow'
import Unfollow from '../layout/Unfollow'

export default function ProfileInfo({ user }) {
  const { currentUser } = useContext(AuthContext)
  const [self, setIsSelf] = useState(false)
  const [followerCount, setFollowerCount] = useState(user.totalFollowers)
  const [following, setIsFollowing] = useState(user.isFollowing)

  const increaseFollowers = () => {
    setFollowerCount(followerCount + 1)
  }

  const decreaseFollowers = () => {
    setFollowerCount(followerCount - 1)
  }

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
      }
    }
  }, [user, currentUser])

  return (
    <>
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
      {!self && !following && (
        <Follow
          style='primary'
          username={user.username}
          increaseFollowers={increaseFollowers}
          setIsFollowing={setIsFollowing}
        />
      )}
      {!self && following && (
        <Unfollow
          style='primary'
          username={user.username}
          decreaseFollowers={decreaseFollowers}
          setIsFollowing={setIsFollowing}
        />
      )}
      {self && (
        <Link href='/settings'>
          <button className='secondary'>Edit profile</button>
        </Link>
      )}
      <br />
      <div className={styles.profileStats}>
        <Link href={`/user/${user.username}/following`}>
          <span className='button'>
            <b>{user.totalFollowing}</b> following
          </span>
        </Link>
        &nbsp; &nbsp;
        <Link href={`/user/${user.username}/followers`}>
          <span className='button'>
            <b>{followerCount}</b> followers
          </span>
        </Link>
      </div>
      <br />
      {user.firstName && user.lastName && (
        <b>
          {user.firstName} {user.lastName}
        </b>
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
    </>
  )
}
