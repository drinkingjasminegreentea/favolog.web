import styles from '../../styles/CatalogStyles.module.css'
import ItemCard from '../../components/item/ItemCard'
import AddItemCard from '../../components/item/AddItemCard'
import ProfileIcon from '../../components/user/ProfileIcon'
import CatalogMenu from '../../components/catalog/CatalogMenu'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext, scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function Page({ catalogId }) {
  const [isEditable, setIsEditable] = useState(false)
  const [catalog, setCatalog] = useState(null)
  const { instance, accounts } = useMsal()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (accounts.length > 0 && user) {
      const account = accounts[0]

      instance.acquireTokenSilent({ account, scopes }).then((response) => {
        fetch(
          `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${response.accessToken}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCatalog(data)
            setIsEditable(user.id === data.userId)
          })
      })
    }
  }, [user, accounts])

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
          <Link href={`/user/${catalog.user.id}`}>
            <div className={styles.catalogAuthor + ' button'}>
              <ProfileIcon
                profileImage={catalog.user.profileImage}
                firstName={catalog.user.firstName}
              />
              <span>
                {item.user.firstName} {item.user.lastName}
              </span>
            </div>
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
