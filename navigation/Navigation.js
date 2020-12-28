import React from 'react'
import { StyleSheet, Image} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator, } from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../components/search'
import MovieShow from '../components/movieShow'
import Favorites from '../components/favoritesMovies'
import News from '../components/news'

const SearchStackNavigator = createStackNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        title: 'Search'
      }
    },
    MovieShow: {
      screen: MovieShow,
      navigationOptions: {
        title: ''
      }
    },
  }
)

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favorite Movies'
      }
    },
    MovieShow: {
      screen: MovieShow,
      navigationOptions: {
        title: ''
      }
    },
  }
)

const NewsStackNavigator = createStackNavigator(
  {
    News: {
      screen: News,
      navigationOptions: {
        title: 'Latest Movies'
      }
    },
    MovieShow: {
      screen: MovieShow,
      navigationOptions: {
        title: ''
      }
    },
  }
)

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/ic_favorite.png')}
            style={styles.icon}/>
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/ic_search.png')}
            style={styles.icon}/>
        }
      }
    },
    News: {
      screen: NewsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/ic_fiber_new.png')}
            style={styles.icon}/>
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)
