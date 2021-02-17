import { useRouter } from 'next/router'
import styles from '../styles/RightPanel.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const RightPanel = () => {
    const router = useRouter()
    return (
        <div className={styles.rightBar}>
            <h3>Hey, Jyldyz</h3>
            <img src={'../icons/settings.svg'}></img>
            <div role='button' 
                className={styles.addButton + " " + commonStyles.button} 
                onClick={() => router.push('/catalog-add')}>
                <span>+</span>
            </div>
        </div>
    )
  }
  
  export default RightPanel
  