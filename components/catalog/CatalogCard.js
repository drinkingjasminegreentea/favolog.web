import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import ItemImage from '../item/ItemImage'

export default function CatalogCard({ catalog, username }) {
  let catalogLink = `/catalog/${catalog.id}`
  if (username) catalogLink += `?username=${username}`

  return (
    <div className={styles.catalogItem}>
      <Link href={catalogLink}>
        <h4 className='button'> {catalog.name} </h4>
      </Link>
      <Link href={catalogLink}>
        <span className='button'> {catalog.itemCount} items </span>
      </Link>
      <Link href={catalogLink}>
        <a className={styles.cardImage + ' button'}>
          <ItemImage imageName={catalog.lastItemImage} />
        </a>
      </Link>
    </div>
  )
}
