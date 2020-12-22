const initialState = { favoritesMovies: [] }


export default function favoritesMovies (state = initialState, action){
  let nextState
  switch (action.type){
    case 'TOGGLE_FAVORITE':
      const favoriteMovieIndex = state.favoritesMovies.findIndex( item =>
        item.id === action.value.id
      )
      if(favoriteMovieIndex === -1){
        nextState = {
          ...state,
          favoritesMovies: [...state.favoritesMovies, action.value]
        }
      }
      else {
        nextState = {
          ...state,
          favoritesMovies: state.favoritesMovies.filter((item, index) => index !== favoriteMovieIndex)
        }
      }
      console.log(nextState)
      return nextState || state;
    default:
      return state;
  }

}
