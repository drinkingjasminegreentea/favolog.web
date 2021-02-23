import styles from '../../styles/Layout.module.css'
import RightPanel from './RightPanel'
import Header from './Header'

export default function Layout({ children }) {
    return <div className={styles.container}>        
        <div className={styles.mainContent}>
            <Header/>
            <div className={styles.content}>
                {children}                         
            </div>            
        </div>
        <RightPanel/>
        </div>
  }