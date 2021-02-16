import styles from '../styles/Home.module.css'
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'
import CatalogItem from '../components/CatalogItem'
import SearchBar from '../components/SearchBar'

export default function User() {
    return <div className={styles.container}>
        <LeftPanel/>
        <div className={styles.mainContent}>
            <SearchBar/>
            <div className={styles.content}>                    
                <h1>Favorite things</h1>
                <div className={styles.catalog}>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                    <CatalogItem/>
                </div>
            </div>
        </div>
        <RightPanel/>
        </div>
  }