import Image from 'next/image'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/CatalogStyles.module.css'
import ProfileIcon from '../user/ProfileIcon'
import Link from 'next/link'

export default function ItemView({ show, parentAction, item, user }) {
  const imageClickHandler = () => {
    if (item.url) {
      const win = window.open(item.url, '_blank')
      win.focus()
    }
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <h5>{item.title}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.itemView}>
          <div className={styles.cardImage} onClick={imageClickHandler}>
            {item.imageName ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
                layout='fixed'
                objectFit='contain'
                width='200'
                height='200'
                quality={100}
              />
            ) : (
              <div className={styles.emptyCatalog}>
                <img src='/icons/file-image.svg' width='50' height='50' />
              </div>
            )}
          </div>
          {item.urlDomain && (
            <a href={item.url} target='_blank'>
              <span className='link'>{item.urlDomain}</span>
            </a>
          )}
          <div className={styles.comment}>
            <ProfileIcon
              profileImage={user.profileImage}
              username={user.username}
            />
            <div>
              <Link href={`/${user.username}`}>
                <span className='link bold'>{user.username}</span>
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
