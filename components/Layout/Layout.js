import styles from '../../styles/Layout.module.css'
import Settings from './Settings'
import AddCatalog from './AddCatalog'
import SearchBar from './SearchBar'
import Link from 'next/link'

const Logo = ()=>{
  return  <Link href="/"><span className={"button " + styles.logo}> FAVOLOG </span></Link> 
 }

export default function Layout({ children }) {
    return <div className={styles.wrapper}>        
        <div className={styles.header}>
                <Logo/>
                <SearchBar/>                            
        </div>
        <Settings/>
        <div className={styles.content}>                    
                {children}        
        </div>        
        <AddCatalog/>  
    </div>
}
