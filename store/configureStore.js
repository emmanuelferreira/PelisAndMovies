import {createStore, combineReducers} from 'redux'
import favoritesMovies from './reducers/favoritesReducer'
import avatarReducer from './reducers/avatarReducer'

const store = createStore(combineReducers({favoritesMovies, avatarReducer}))

export default store
