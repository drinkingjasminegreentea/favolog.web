import styles from '../../styles/Header.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleParam = (e) => setQuery(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = query
    setQuery('')
    router.push({
      pathname: '/search',
      query: { q: searchQuery },
    })
  }

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type='search'
        name='q'
        placeholder='Search users, catalogs'
        autoComplete='off'
        value={query}
        onChange={handleParam}
      />
      <button type='submit'>
        <Image src='/icons/search.svg' width='25' height='25' layout='fixed' />
      </button>
    </form>
  )
}
