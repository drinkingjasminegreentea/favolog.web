import { useRouter } from 'next/router'
import styles from '../styles/SearchBar.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const SearchBar = () => {
    const router = useRouter()
    
    return (
        <div className={styles.header}>
                <img className={commonStyles.button} src={'../icons/home.svg'} onClick={() => router.push('/')}>

                </img>
                <div className={styles.searchBar}>
                    <img src={'../icons/search.svg'}></img>
                    <input placeholder='Search'></input>
                </div>
            </div>
    )
  }
  
  export default SearchBar
  