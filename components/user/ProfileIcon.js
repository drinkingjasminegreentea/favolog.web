import styles from '../../styles/CatalogStyles.module.css'

export default function ProfileIcon({ profileImage, username }) {
  return (
    <div className='button'>
      {profileImage ? (
        <img src={profileImage} className={styles.authorProfile} />
      ) : (
        <div className={styles.authorPlaceholder}>
          <b> {username.substring(0, 1).toUpperCase()} </b>{' '}
        </div>
      )}
    </div>
  )
}
