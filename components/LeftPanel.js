import { useRouter } from 'next/router'
import styles from '../styles/LeftPanel.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const LeftPanel = () => {
    const router = useRouter()

    return (
        <div className={styles.sideBar}>
        <div className={styles.logo}>
            <h1 className={commonStyles.button} onClick={() => router.push('/user/raihan')}>
                Favolog
            </h1>                  
        </div>
        <div className={styles.profileInfo}>
            <img src={'../images/profile.jpg'} ></img>
            <h1>Guy</h1>
            <p>Investor</p>            
        </div>
    </div>
    )
  }
  
  export default LeftPanel
  