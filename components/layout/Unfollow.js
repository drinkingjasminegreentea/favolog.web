import { useContext, useState } from 'react'
import { AuthContext, SignInModal } from '../../src/AuthContext'

export default function Unfollow({
  style,
  username,
  decreaseFollowers,
  setIsFollowing,
}) {
  const { currentUser, getToken } = useContext(AuthContext)
  const [showLogin, setShowLogin] = useState(false)
  const className = style || 'secondary'

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
          if (response.ok) {
            decreaseFollowers()
            setIsFollowing(false)
          } else Promise.reject()
        })
        .catch((error) => console.error(error))
    })
  }

  return (
    <span className='center'>
      <button className={className} onClick={followHandler}>
        Following <img src='/icons/check.svg' />
      </button>
      <SignInModal show={showLogin} parentAction={() => setShowLogin(false)} />
    </span>
  )
}
