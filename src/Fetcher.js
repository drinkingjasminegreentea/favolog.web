import { useContext } from 'react'
import { AuthContext } from '@/src/AuthContext'

export function publicFetcher(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function privateFetcher(url) {
  const { getToken } = useContext(AuthContext)

  return getToken().then((accessToken) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response)
      })
      .catch((error) => {
        console.error(error)
      })
  })
}
