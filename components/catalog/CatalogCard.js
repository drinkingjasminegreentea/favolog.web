import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import ItemImage from '../item/ItemImage'

export default function CatalogCard({ catalog, username }) {
  let catalogLink = `/catalog/${catalog.id}`
  if (username) catalogLink += `?username=${username}`

  return (
    <Link href={catalogLink}>
      <div className={styles.catalogItem + ' button'}>
        <ItemImage imageName={catalog.lastItemImage} />
        <h4> {catalog.name} </h4>
        <span> {catalog.itemCount} items </span>
      </div>
    </Link>
  )
}
