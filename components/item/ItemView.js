import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/CatalogStyles.module.css'
import ProfileIcon from '../user/ProfileIcon'
import Link from 'next/link'
import ItemImage from './ItemImage'

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
        <h5 className='light'>{item.title}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.itemView}>
          <ItemImage imageName={item.imageName} onClick={imageClickHandler} />
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
                <h5 className='button'>{user.username}</h5>
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
