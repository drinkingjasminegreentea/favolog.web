import Image from 'next/image'
import Link from 'next/link'
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
      <Link href={`/${username}`}>
        <div
          className={styles.authorPlaceholder + ' button'}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontSize: `${fontSize}px`,
          }}
        >
          {username.substring(0, 1).toUpperCase()}
        </div>
      </Link>
    )

  if (profileImage.startsWith('https://'))
    return (
      <Link href={`/${username}`}>
        <img
          src={profileImage}
          className={styles.round + ' button'}
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </Link>
    )
  else {
    return (
      <Link href={`/${username}`}>
        <span className='grid'>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${profileImage}`}
            layout='fixed'
            objectFit='cover'
            objectPosition='top'
            width={width}
            height={height}
            quality={100}
            className={styles.round + ' button'}
          />
        </span>
      </Link>
    )
  }
}
