import { useContext, useEffect, useState } from 'react'
import { AuthContext, SignInModal } from '../../src/AuthContext'

export default function FollowButton({
  style,
  username,
  updateTotalFollowers,
  following,
}) {
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const className = style || 'secondary'

  useEffect(() => {
    if (following) setIsFollowing(following)
  }, [])

  const followHandler = async function () {
    if (!currentUser) {
      setShowModal(true)
      return
    }

    const userFollow = {
      username: username,
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
          if (!response.ok) Promise.reject()
          if (updateTotalFollowers) {
            isFollowing
              ? setTotalFollowersSate(totalFollowersState - 1)
              : setTotalFollowersSate(totalFollowersState + 1)
            setIsFollowing(!isFollowing)
          }
        })
        .catch((error) => console.error(error))
    })
  }

  return (
    <>
      <button className={className} onClick={followHandler}>
        {!isFollowing ? 'Follow' : 'Unfollow'}
      </button>
      <SignInModal show={showModal} parentAction={() => setShowModal(false)} />
    </>
  )
}
