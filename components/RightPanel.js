import styles from '../styles/RightPanel.module.css'

const RightPanel = () => {
    return (
        <div className={styles.rightBar}>
            <h3>Hey, Jyldyz</h3>
            <img src={'../icons/settings.svg'}></img>
            <div><div className={styles.addButton}><span>+</span></div></div>
        </div>
    )
  }
  
  export default RightPanel
  