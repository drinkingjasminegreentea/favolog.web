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
