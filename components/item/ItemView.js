import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/CatalogStyles.module.css'
import ProfileIcon from '../user/ProfileIcon'
import Link from 'next/link'

export default function ItemView({ show, parentAction, item, user }) {
  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <a href={item.url} target='_blank'>
          <Modal.Title>{item.title}</Modal.Title>
        </a>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.itemView}>
          <div className={styles.cardImage}>
            {item.imageName ? (
              <a href={item.url} target='_blank'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
                  layout='fixed'
                  objectFit='contain'
                  width='200'
                  height='200'
                  quality={100}
                />
              </a>
            ) : (
              <div className={styles.emptyCatalog}>
                <img src='/icons/file-image.svg' width='50' height='50' />
              </div>
            )}
          </div>
          <div className={styles.comment}>
            <ProfileIcon
              profileImage={user.profileImage}
              firstName={user.firstName}
            />
            <div>
              <Link href={`/user/${user.id}`}>
                <span className='link bold'>
                  {user.firstName} {user.lastName}
                </span>
              </Link>
              <br />
              <span>{item.comment}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
