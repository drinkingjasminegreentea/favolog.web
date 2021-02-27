import styles from '../../styles/Layout.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import RightPanel from './RightPanel'
import SearchBar from './SearchBar'
import Link from 'next/link'

function Header() {
    return <div className={styles.header}>
        <Link href="/">
            <h2 className={commonStyles.button}>Favolog</h2>      
        </Link>     
        <SearchBar/>
    </div>
}

export default function Layout({ children }) {
    return <div className={styles.wrapper}>
        <div className={styles.center}>
            <Header/>
            <div className={styles.content}>
                {children}                         
            </div>        
        </div>        
        <RightPanel/>
    </div>
}