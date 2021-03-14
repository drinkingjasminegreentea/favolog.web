import styles from '../../styles/Layout.module.css'
import { useRouter } from 'next/router'
import { useState, useRef, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef()

  const handleParam = (e) => setQuery(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = query
    setQuery('')
    inputRef.current.blur()
    router.push({
      pathname: '/search',
      query: { q: searchQuery },
    })
  }

  return (
    <Form className={styles.search} onSubmit={handleSubmit}>
      <img src={'/icons/search.svg'} />
      <Form.Control
        type='text'
        placeholder='Search'
        value={query}
        onChange={handleParam}
        ref={inputRef}
      />
    </Form>
  )
}
