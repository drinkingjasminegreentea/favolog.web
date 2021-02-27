import commonStyles from '../../styles/CommonStyles.module.css'
import styles from '../../styles/Layout.module.css'
import {useRouter} from 'next/router'
import {useState, useRef} from 'react'
import Link from 'next/link'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const inputRef = useRef();

    const handleParam = e => setQuery(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const searchQuery = query
        setQuery('')        
        inputRef.current.blur()
        router.push({
        pathname: '/search',
        query: {q: searchQuery},
        })
    }
    
    return (
        <div className={styles.search}>                        
            <Link href="/">
                <img className={commonStyles.button} 
                    src={'/icons/home.svg'}/>
            </Link>
            <Form onSubmit={handleSubmit}>                
                <img src={'/icons/search.svg'}></img>
                <Form.Control type="text" 
                    placeholder="Search" 
                    value={query} 
                    onChange={handleParam}
                    ref={inputRef}/>                
            </Form>
        </div>
    )
  }
  