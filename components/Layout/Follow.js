import { useContext, useState } from 'react'
import { AuthContext, SignInModal } from '../../src/AuthContext'

export default function Follow({ style }) {
  const { currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const className = style || 'secondary'

  const followHandler = function () {
    if (!currentUser) {
      setShowModal(true)
    }
  }

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
    <>
      <button className={className} onClick={followHandler}>
        Follow
      </button>
      <SignInModal show={showModal} parentAction={() => setShowModal(false)} />
    </>
  )
}
