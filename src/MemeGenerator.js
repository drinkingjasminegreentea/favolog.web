export default function GetMeme(searchQuery) {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=Pc7I6LVPkv1JtuEWSSruySqUCQwODixO&q=${searchQuery}&limit=5`
  ).then((response) => {})
}
