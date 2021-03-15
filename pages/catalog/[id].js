import styles from '../../styles/CatalogStyles.module.css'
import ItemCard from '../../components/item/ItemCard'
import AddItemCard from '../../components/item/AddItemCard'
import CatalogMenu from '../../components/catalog/CatalogMenu'
import ProfileIcon from '../../components/user/ProfileIcon'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../src/UserContext'
import { PageContext } from '../../src/PageContext'

export default function Page({ catalogId }) {
  const [isEditable, setIsEditable] = useState(false)
  const [catalog, setCatalog] = useState(null)
  const { user } = useContext(UserContext)
  const { setActivePage } = useContext(PageContext)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data)
      })
  }, [])

  useEffect(() => {
    if (user && catalog) {
      setIsEditable(user.id === catalog.userId)
    }
    setActivePage(null)
  }, [user, catalog])

  const addItemToCatalog = (item) => {
    const updatedCatalog = { ...catalog }
    updatedCatalog.items.unshift(item)
    setCatalog(updatedCatalog)
  }

  const removeItemFromCatalog = (item) => {
    const updatedCatalog = { ...catalog }
    const index = updatedCatalog.items.findIndex(({ id }) => id === item.id)
    if (index === -1) {
      throw 'Could not find item to delete from the catalog'
    }
    updatedCatalog.items.splice(index, 1)
    setCatalog(updatedCatalog)
  }

  return catalog ? (
    <>
      <div className={styles.catalogHeader}>
        <h4> {catalog.name} </h4>
        {isEditable ? (
          <CatalogMenu catalog={catalog} setCatalog={setCatalog} />
        ) : (
          <Link href={`/${catalog.user.username}`}>
            <a className='button'>
              <ProfileIcon
                profileImage={catalog.user.profileImage}
                username={catalog.user.username}
              />
            </a>
          </Link>
        )}
      </div>
      <div className={styles.catalog}>
        {isEditable && (
          <AddItemCard
            catalogId={catalog.id}
            addItemToCatalog={addItemToCatalog}
          />
        )}
        {catalog.items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            catalogId={catalog.id}
            isEditable={isEditable}
            user={catalog.user}
            removeItemFromCatalog={removeItemFromCatalog}
          />
        ))}
      </div>
    </>
  ) : (
    <span> loading </span>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      catalogId: params.id,
    },
  }
}
