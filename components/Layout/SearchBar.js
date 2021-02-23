import styles from '../../styles/SearchBar.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import Link from 'next/link'

export default function SearchBar() {
    
    return (
        <div className={styles.searchBar}>            
            <img src={'/icons/search.svg'}></img>
            <input placeholder='Search'></input>
        </div>
    )
  }  
  