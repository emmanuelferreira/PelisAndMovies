import {createStore} from 'redux'
import favoritesMovies from './reducers/favoritesReducer'

const store = createStore(favoritesMovies)

export default store
