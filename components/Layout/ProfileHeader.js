import styles from '../styles/CommonStyles.module.css'

export default function Header() {
    return <div className="row">
        <div className="leftColumn">
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
        <div className="centerColumn">

        </div>
    </div>
  }