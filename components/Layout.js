import styles from '../styles/Layout.module.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import SearchBar from './SearchBar'

export default function Layout({ children }) {
    return <div className={styles.container}>
        <LeftPanel/>
        <div className={styles.mainContent}>
            <SearchBar/>
            <div className={styles.content}>                    
                {children}             
            </div>
        </div>
        <RightPanel/>
        </div>
  }