import commonStyles from '../../styles/CommonStyles.module.css'
import styles from '../../styles/Header.module.css'
import Link from 'next/link'
import SearchBar from './SearchBar'

function ProfileInfo({user}){
return <> 
    <img src={'/images/profile.jpg'} ></img>
    <h1>{user.username}</h1>
    <p>{user.bio}</p>
</>
}

export default function Header({user}) {
    return <div className={styles.headerRow}>
        <div className={styles.leftColumn}>
            <Link href="/">
                <h1 className={commonStyles.button}>
                    Favolog
                </h1>                  
            </Link>
            <Link href="/">
                <img className={commonStyles.button} 
                    src={'/icons/home.svg'}/>
            </Link>
        </div>
        <div className={styles.centerColumn}>
            {user && <ProfileInfo>{user}</ProfileInfo>}
            <SearchBar/>
        </div>
    </div>
  }