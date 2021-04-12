import { useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from '../../src/AuthContext'

export default function DeleteItem({ show, parentAction, item }) {
  const { getToken } = useContext(AuthContext)
  const router = useRouter()

  const submit = async () => {
    getToken().then((accessToken) => {
      fetch(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${item.catalogId}/item/${item.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            parentAction()
            router.push(`/catalog/${item.catalogId}?refreshKey=${Date.now()}`)
          } else return Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={() => parentAction()} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <button className='secondary' onClick={() => parentAction()}>
          Cancel
        </button>
        <button className='primary' onClick={submit}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  )
}
