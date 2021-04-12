import Image from 'next/image'
import styles from '../../styles/Feed.module.css'
import ItemMenu from './ItemMenu'

export default function CatalogItemCard({ item, isEditable }) {
  return (
    <div className='card'>
      {isEditable && <ItemMenu item={item} />}
      <a href={item.url} target='_blank' className='grid'>
        <div className={styles.text}>
          <h5>{item.title}</h5>
          {item.url && (
            <span className='link'>
              <Image
                src='/icons/box-arrow-up-right.svg'
                width='10'
                height='10'
              />
              {item.urlDomain}
            </span>
          )}
        </div>
        {item.imageName && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='400'
            height='300'
            quality={100}
          />
        )}
      </a>
      <div>{item.comment}</div>
    </div>
  )
}
