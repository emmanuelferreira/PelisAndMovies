const API_TOKEN = "6ba366e494ed88e5891414ad0ec069df";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = "https://api.themoviedb.org/3/search/movie?api_key="+API_TOKEN+"&language=en-US&query="+text+"&page="+page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}


export function getMovieDetailsFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=en-US')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
