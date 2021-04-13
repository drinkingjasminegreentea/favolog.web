import styles from '../../styles/MobileFooter.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function MobileFooter() {
  return (
    <div className={styles.footerMenu}>
      <Link href='/'>
        <div className='button'>
          <Image src='/icons/home.svg' width='20' height='20' layout='fixed' />
        </div>
      </Link>
      <Link href='/'>
        <div className='button'>
          <Image
            src='/icons/search.svg'
            width='23'
            height='23'
            layout='fixed'
          />
        </div>
      </Link>
      <Link href='/'>
        <div className='button'>
          <Image src='/icons/plus.svg' width='23' height='23' layout='fixed' />
        </div>
      </Link>
      <Link href='/'>
        <div className='button'>
          <Image
            src='/icons/person.svg'
            width='23'
            height='23'
            layout='fixed'
          />
        </div>
      </Link>
    </div>
  )
}
