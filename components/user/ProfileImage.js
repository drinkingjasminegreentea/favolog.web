import Image from 'next/image'
import styles from '../../styles/ProfileImage.module.css'

export default function ProfileImage({
  profileImage,
  username,
  width,
  height,
}) {
  const fontSize = width / 2

  if (!profileImage)
    return (
      <div
        className={styles.authorPlaceholder}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          fontSize: `${fontSize}px`,
        }}
      >
        {username.substring(0, 1).toUpperCase()}
      </div>
    )

  if (profileImage.startsWith('https://'))
    return (
      <img
        src={profileImage}
        className={styles.round}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    )
  else {
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${profileImage}`}
        layout='fixed'
        objectFit='cover'
        objectPosition='top'
        width={width}
        height={height}
        quality={100}
        className={styles.round}
      />
    )
  }
}
