import Image from 'next/image'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import styles from '../../styles/Feed.module.css'
import { AuthContext } from '../../src/AuthContext'
import ItemMenu from './ItemMenu'

export default function CatalogItemCard({ item, isEditable }) {
  const { getToken } = useContext(AuthContext)

  const [currentItem, setCurrentItem] = useState(item)
  const [newComment, setNewComment] = useState('')

  const addComment = async () => {
    item.comment = newComment

    getToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else return Promise.reject(response)
        })
        .then((data) => {
          setCurrentItem(data)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  return (
    <div className='card'>
      {isEditable && <ItemMenu item={currentItem} />}
      <a href={currentItem.url} target='_blank' className='grid'>
        <div className={styles.text}>
          <h5>{currentItem.title}</h5>
          {currentItem.url && (
            <span className='link'>
              <Image
                src='/icons/box-arrow-up-right.svg'
                width='10'
                height='10'
              />
              {currentItem.urlDomain}
            </span>
          )}
        </div>
      </a>
      {currentItem.imageName && (
        <div className='center'>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='300'
            height='150'
            quality={100}
          />
        </div>
      )}
      {currentItem.comment ? (
        <div>{currentItem.comment}</div>
      ) : (
        <>
          <div className={styles.addComment}>
            <b>
              Tell us why you love it &nbsp; <img src='/icons/chat-dots.svg' />
            </b>
            <br />
            <Form.Control
              as='textarea'
              rows={5}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <br />
            <div className='end'>
              <button className='primary' onClick={addComment}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
