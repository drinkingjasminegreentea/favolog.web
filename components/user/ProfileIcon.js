import styles from '../../styles/CatalogStyles.module.css'

export default function ProfileIcon({ profileImage, username }) {
  let profileUrl
  if (profileImage) {
    if (profileImage.startsWith('https://')) profileUrl = profileImage
    else
      profileUrl = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${profileImage}`
  }

  return (
    <div className='button'>
      {profileImage ? (
        <img src={profileUrl} className={styles.authorProfile} />
      ) : (
        <div className={styles.authorPlaceholder}>
          <b> {username.substring(0, 1).toUpperCase()} </b>{' '}
        </div>
      )}
    </div>
  )
}
