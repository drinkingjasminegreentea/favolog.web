import Link from 'next/link'
import styles from '../styles/SearchBar.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const SearchBar = () => {
    
    return (
        <div className={styles.header}>
            <Link href="/catalog">
                <img className={commonStyles.button} src={'/icons/home.svg'}/>
            </Link>                
            <div className={styles.searchBar}>
                <img src={'/icons/search.svg'}></img>
                <input placeholder='Search'></input>
            </div>
        </div>
    )
  }
  
  export default SearchBar
  