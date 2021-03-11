import ItemImage from './ItemImage'
import Comment from './Comment'
import Link from 'next/link'
import styles from '../../styles/CatalogStyles.module.css'

export default function FeedItemCard({ item }) {
  return (
    <div className={styles.catalogItem}>
      <a href={item.url} target='_blank'>
        <span className='bold'>{item.title}</span>
      </a>

      <div className={styles.cardImage}>
        <ItemImage imageName={item.imageName} />
      </div>

      <Link href={`catalog/${item.catalogId}`}>
        <h5 className='link'> {item.catalogName} </h5>
      </Link>
      <Comment item={item} />
    </div>
  )
}
