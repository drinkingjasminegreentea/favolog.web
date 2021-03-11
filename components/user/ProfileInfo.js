import Image from 'next/Image'
import Link from 'next/link'
import styles from '../../styles/ProfileInfo.module.css'
import Button from 'react-bootstrap/Button'
import { useEffect, useState, useContext } from 'react'
import { UserContext, scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function ProfileInfo({ user, totalFollowing, totalFollowers }) {
  const { user: loggedInUser } = useContext(UserContext)
  const [self, setIsSelf] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [totalFollowersState, setTotalFollowersSate] = useState(totalFollowers)
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  useEffect(() => {
    if (loggedInUser) {
      if (user.id == loggedInUser.id) {
        setIsSelf(true)
        setIsFollowing(false)
      } else {
        instance.acquireTokenSilent({ account, scopes }).then((response) => {
          fetch(
            `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${loggedInUser.id}/isFollowing/${user.id}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${response.accessToken}`,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => setIsFollowing(data))
        })
      }
    }
  }, [loggedInUser])

  const onButtonClick = async () => {
    const userFollow = {
      userId: user.id,
      followerId: loggedInUser.id,
    }

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/follow`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
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
          <span> {user.firstName.substring(0, 1).toUpperCase()} </span>{' '}
        </div>
      )}
      <div className={styles.profileDetails}>
        <h4>
          {user.firstName && user.firstName} {user.lastName && user.lastName}
        </h4>
        {user.website && <a href={user.website}> {user.website} </a>}
        {user.bio && <span> {user.bio} </span>}
        <br />
        <Link href={`/user/${user.id}/following`}>
          <span className={styles.followInfo + ' button'}>
            {totalFollowing} following
          </span>
        </Link>
        &nbsp; | &nbsp;
        <Link href={`/user/${user.id}/followers`}>
          <span className={styles.followInfo + ' button'}>
            {totalFollowersState} followers
          </span>
        </Link>
      </div>
      <div className={styles.followUnfollow}>
        {!self && (
          <Button size='sm' variant='secondary' onClick={onButtonClick}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </div>
    </div>
  )
}