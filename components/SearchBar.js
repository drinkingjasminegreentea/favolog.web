import styles from '../styles/SearchBar.module.css'

const SearchBar = () => {
    return (
        <div className={styles.header}>
                <img src={'../icons/home.svg'}></img>
                <div className={styles.searchBar}>
                    <img src={'../icons/search.svg'}></img>
                    <input placeholder='Search'></input>
                </div>
            </div>
    )
  }
  
  export default SearchBar
  