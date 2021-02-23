import styles from '../../styles/SearchBar.module.css'

export default function SearchBar() {
    
    return (
        <div className={styles.searchBar}>
                <img src={'/icons/search.svg'}></img>
                <input placeholder='Search'></input>
            </div>
    )
  }  
  