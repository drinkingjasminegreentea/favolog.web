import styles from '../styles/CatalogStyles.module.css'
export default function ProfileIcon({ profileImage, firstName }) {
  return profileImage ? (
    <Image
      src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${item.profileImage}`}
      layout='fixed'
      objectFit='cover'
      objectPosition='top'
      width='30'
      height='30'
      quality={100}
      className={styles.authorProfile + ' button'}
    />
  ) : (
    <div className={styles.authorPlaceholder + ' button'}>
      <b> {firstName.substring(0, 1).toUpperCase()} </b>{' '}
    </div>
  )
}
