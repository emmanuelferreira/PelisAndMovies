import React from 'react';
import { StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import MovieList from './movieList';


class Favorites extends React.Component {
  render() {
    return (
      <MovieList
        movies={this.props.favoritesMovies}
        navigation={this.props.navigation}
        favoriteList={true}
      />
    )
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return{
    favoritesMovies: state.favoritesMovies
  }
}

export default connect(mapStateToProps)(Favorites);
