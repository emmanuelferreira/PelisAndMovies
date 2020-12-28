import React from 'react';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'



export default class App extends React.Component {

  render(){
    let persistor = persistStore(store)
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}
