import styles from '../../styles/Layout.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import RightPanel from './RightPanel'
import SearchBar from './SearchBar'
import Link from 'next/link'

function Header() {
    return <div className={styles.header}>
        <Link href="/">
            <h4 className={commonStyles.button}> <b> Favolog</b></h4>      
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