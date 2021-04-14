export default async function handler(req, res) {
  const { slug } = req.query

  const linkPreviewUrl = `${
    process.env.LINK_PREVIEW_API_URL
  }${encodeURIComponent(slug)}`

  const openGraphUrl = `${process.env.OPEN_GRAPH_API_URL}${encodeURIComponent(
    slug
  )}?app_id=${process.env.OPEN_GRAPH_API_KEY}`

  // try link preview first, then open graph io
  let response = await fetch(linkPreviewUrl)
  if (response.ok) {
    const jsonData = await response.json()
    res.status(200).json(jsonData)
  } else {
    response = await fetch(openGraphUrl)
    const jsonData = await response.json()
    res.status(200).json(jsonData.hybridGraph)
  }
}
