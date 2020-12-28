import {createStore, combineReducers} from 'redux'
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'


import favoritesMovies from './reducers/favoritesReducer'
import avatarReducer from './reducers/avatarReducer'

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const store = createStore(persistCombineReducers(rootPersistConfig, {favoritesMovies, avatarReducer}))

export default store
