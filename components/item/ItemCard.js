import Image from 'next/image'
import styles from '../../styles/Feed.module.css'

export default function ItemCard({ item }) {
  const user = {
    id: item.userId,
    profileImage: item.profileImage,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
  }

  return (
    <div className='card'>
      <div className={styles.text}>
        <h5>{item.title}</h5>
        <span className='link'>
          <Image src='/icons/box-arrow-up-right.svg' width='10' height='10' />
          {item.urlDomain}
        </span>
      </div>
      {item.imageName && (
        <a href={item.url} target='_blank' className={styles.linkImage}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='400'
            height='300'
            quality={100}
          />
        </a>
      )}
      <div>{item.comment}</div>
    </div>
  )
}
