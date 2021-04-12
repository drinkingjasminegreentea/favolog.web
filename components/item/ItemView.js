import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/CatalogStyles.module.css'
import ProfileImage from '../user/ProfileImage'
import Link from 'next/link'
import Image from 'next/image'
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
        <h5>{item.title}</h5>
      </Modal.Header>
      <Modal.Body>
        <a href={item.url} target='_blank'>
          <div className='grid'>
            {item.url && (
              <a href={item.url} target='_blank'>
                <span>
                  <Image
                    src='/icons/box-arrow-up-right.svg'
                    width='10'
                    height='10'
                  />
                  {item.urlDomain}
                </span>
              </a>
            )}
            {item.imageName && (
              <div className='center'>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
                  layout='fixed'
                  objectFit='contain'
                  width='200'
                  height='200'
                  quality={100}
                />
              </div>
            )}
          </div>
        </a>
        <div className={styles.comment}>
          <ProfileImage
            profileImage={user.profileImage}
            username={user.username}
            width='35'
            height='35'
          />
          <div>
            <Link href={`/${user.username}`}>
              <b className='button'>{user.username}</b>
            </Link>
            <br />
            <span>{item.comment}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
