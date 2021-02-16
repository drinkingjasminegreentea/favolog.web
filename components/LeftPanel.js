import styles from '../styles/LeftPanel.module.css'

const LeftPanel = () => {
    return (
        <div className={styles.sideBar}>
        <div className={styles.logo}>
            <h1>Favolog</h1>                          
        </div>
        <div className={styles.profileInfo}>
            <img src={'../images/oprah.jpg'} ></img>
            <h1>Oprah</h1>
            <p>Celebrity</p>            
        </div>
    </div>
    )
  }
  
  export default LeftPanel
  