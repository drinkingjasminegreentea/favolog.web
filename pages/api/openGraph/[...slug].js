export default async function handler(req, res) {
  const { slug } = req.query

  let url = encodeURIComponent(slug)
  url = url.replace('/%2C/g', '%2F')

  const linkPreviewUrl = `${process.env.LINK_PREVIEW_API_URL}${url}`
  const openGraphUrl = `${process.env.OPEN_GRAPH_API_URL}${url}?app_id=${process.env.OPEN_GRAPH_API_KEY}`

  console.log({ linkPreviewUrl })
  console.log({ openGraphUrl })

  // try link preview first, then open graph io
  let response = await fetch(linkPreviewUrl)
  if (response.ok) {
    const jsonData = await response.json()
    console.log('link preview api', jsonData)
    res.status(200).json(jsonData)
  } else {
    response = await fetch(openGraphUrl)
    const jsonData = await response.json()
    console.log('open graph api', jsonData)
    res.status(200).json(jsonData.hybridGraph)
  }
}
