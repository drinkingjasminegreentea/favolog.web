export default async function handler(req, res) {
  const { slug } = req.query
  const url = `${process.env.OPEN_GRAPH_API_URL}${encodeURIComponent(
    slug
  )}?app_id=${process.env.OPEN_GRAPH_API_KEY}`

  const response = await fetch(url)
  const jsonData = await response.json()
  console.log('api response', jsonData)
  res.status(200).json(jsonData)
}
