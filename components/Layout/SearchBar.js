import styles from '../../styles/Layout.module.css'
import { useRouter } from 'next/router'
import { useState, useRef, useContext } from 'react'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ActivePages, PageContext } from '../../src/PageContext'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef()
  const { activePage } = useContext(PageContext)

  let homeStyle = 'button'
  let exploreStyle = 'button'

  if (activePage == ActivePages.home) homeStyle = homeStyle + ' active'
  if (activePage == ActivePages.explore) exploreStyle = exploreStyle + ' active'

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
    <div className={styles.search}>
      <Link href='/'>
        <a>
          <img
            src='/icons/home.svg'
            width='25'
            height='25'
            layout='fixed'
            className={homeStyle}
          />
        </a>
      </Link>

      <Link href='/explore'>
        <a>
          <img
            src='/icons/explore.svg'
            width='25'
            height='25'
            layout='fixed'
            className={exploreStyle}
          />
        </a>
      </Link>

      <Form onSubmit={handleSubmit}>
        <img src={'/icons/search.svg'} />
        <Form.Control
          type='text'
          placeholder='Search'
          value={query}
          onChange={handleParam}
          ref={inputRef}
        />
      </Form>
    </div>
  )
}
