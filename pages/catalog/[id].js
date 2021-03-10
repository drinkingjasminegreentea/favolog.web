import styles from '../../styles/CatalogStyles.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import CatalogItemCard from '../../components/CatalogItemCard'
import EditCatalog from '../../components/EditCatalog'
import AddItemCard from '../../components/AddItemCard'
import DeleteCatalog from '../../components/DeleteCatalog'
import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { UserContext, scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

const CatalogEdit = ({ catalog, setCatalog }) => {
  const [showEditCatalog, setShowEditCatalog] = useState(false)
  const [showDeleteCatalog, setShowDeleteCatalog] = useState(false)

  function updateCatalog(update) {
    if (update) {
      const items = catalog.items
      const updatedCatalog = { ...catalog, ...update }
      updatedCatalog.items = items
      setCatalog(updatedCatalog)
    }
    setShowEditCatalog(false)
  }

  return (
    <span className={styles.addEdit}>
      <img
        src='/icons/pencil-fill.svg'
        className={commonStyles.button}
        onClick={() => setShowEditCatalog(!showEditCatalog)}
      />
      <img
        src='/icons/trash.svg'
        className={commonStyles.button}
        onClick={() => setShowDeleteCatalog(!showDeleteCatalog)}
      />
      <EditCatalog
        show={showEditCatalog}
        parentAction={updateCatalog}
        catalog={catalog}
      />
      <DeleteCatalog
        show={showDeleteCatalog}
        parentAction={() => setShowDeleteCatalog(!showDeleteCatalog)}
        catalogId={catalog.id}
      />
    </span>
  )
}

const ProfileImage = ({ user }) => {
  if (user.profileImage) {
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${user.profileImage}`}
        layout='fixed'
        objectFit='cover'
        objectPosition='top'
        width='30'
        height='30'
        quality={100}
        className={styles.authorProfile}
      />
    )
  } else {
    return (
      <div className={styles.authorPlaceholder}>
        <b> {user.firstName.substring(0, 1).toUpperCase()} </b>{' '}
      </div>
    )
  }
}

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
          <CatalogEdit catalog={catalog} setCatalog={setCatalog} />
        ) : (
          <Link href={`/user/${catalog.user.id}`}>
            <div className={styles.catalogAuthor + ' ' + commonStyles.button}>
              <ProfileImage user={catalog.user} />
              <span> {catalog.user.firstName}</span>
              {catalog.user.lastName && <span> {catalog.user.lastName}</span>}
            </div>
          </Link>
        )}
      </div>
      <div className={styles.catalog}>
        <AddItemCard
          catalogId={catalog.id}
          addItemToCatalog={addItemToCatalog}
        />
        {catalog.items.map((item) => (
          <CatalogItemCard
            key={item.id}
            item={item}
            catalogId={catalog.id}
            isEditable={isEditable}
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
