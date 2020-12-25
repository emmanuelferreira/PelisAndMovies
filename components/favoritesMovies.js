import React from 'react';
import { StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import MovieList from './movieList';
import Avatar from ' avatar';



class Favorites extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <MovieList
          movies={this.props.favoritesMovies}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return{
    favoritesMovies: state.favoritesMovies
  }
}

export default connect(mapStateToProps)(Favorites);
