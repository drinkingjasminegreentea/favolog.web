import Link from 'next/link'
import styles from '../styles/LeftPanel.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const LeftPanel = () => {    

    return (
        <div className={styles.sideBar}>
        <div className={styles.logo}>
            <Link href="/user/raihan">
            <h1 className={commonStyles.button}>
                Favolog
            </h1>                  
            </Link>            
        </div>
        <div className={styles.profileInfo}>
            <img src={'/images/profile.jpg'} ></img>
            <h1>Guy</h1>
            <p>Investor</p>            
        </div>
    </div>
    )
  }
  
  export default LeftPanel
  