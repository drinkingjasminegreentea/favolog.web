import { publicFetcher, privateFetcher } from '@/src/Fetcher'
import styles from '@/styles/Feed.module.css'
import ProfileImage from '@/components/user/ProfileImage'
import { AuthContext } from '@/src/AuthContext'
import { PageContext } from '@/src/PageContext'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import Image from 'next/image'

export default function Page({ itemId }) {
  const { setOpenGraphInfo, openGraphInfo } = useContext(PageContext)
  const { currentUser } = useContext(AuthContext)

  let url = null
  let fetcher = null

  if (currentUser) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item/${itemId}`
    fetcher = privateFetcher
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item/${itemId}/public`
    fetcher = publicFetcher
  }

  const { data, error } = useSWR(url, fetcher)

  useEffect(() => {
    if (data) {
      const image = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${data.imageName}`
      setOpenGraphInfo({
        ...openGraphInfo,
        image,
        title: `${data.title}`,
        url: `${process.env.NEXT_PUBLIC_REDIRECTURI}/item/${data.id}`,
      })

      if (currentUser)
        setIsSelf(data.catalog.user.username == currentUser.displayName)
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <div className='mainContent'>
        <Spinner className='loading' animation='grow' />
      </div>
    )

  return (
    <div className='mainContent'>
      <div className='card'>
        <a href={data.url} target='_blank' className='grid'>
          <h5>{data.title}</h5>
          <span>
            <Image src='/icons/box-arrow-up-right.svg' width='10' height='10' />
            {data.urlDomain}
          </span>
          {data.imageName && (
            <div className='center'>
              <Image
                src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${data.imageName}`}
                layout='fixed'
                objectFit='contain'
                width='300'
                height='150'
                quality={100}
              />
            </div>
          )}
        </a>
        <div className={styles.header}>
          <ProfileImage
            profileImage={data.catalog.user.profileImage}
            username={data.catalog.user.username}
            width='35'
            height='35'
          />
          <span>
            <Link href={`/${data.catalog.user.username}`}>
              <b className='button'>{data.catalog.user.username}</b>
            </Link>
            <b>{' > '}</b>
            <Link href={`/catalog/${data.catalog.id}`}>
              <b className='button'>{data.catalog.name}</b>
            </Link>
          </span>
        </div>
        <div>{data.comment}</div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      itemId: params.id,
    },
  }
}