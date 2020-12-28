import React from 'react';
import { connect } from 'react-redux';
import {FlatList, View, StyleSheet} from 'react-native'
import Movie from './movieItem'


class MovieList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }


  _displayMovieShow = (idMovie) => { // Arrow function automatically binds this to the component
    this.props.navigation.navigate("MovieShow", { idMovie: idMovie })
  }

  render(){
    return(
      <FlatList
        style={styles.list}
        data={this.props.movies}
        extraData={this.props.favoritesMovies}
        renderItem={ ({item}) =>
          <Movie movie={item}
                 isMovieFavorite={(this.props.favoritesMovies.findIndex(movie => movie.id === item.id) !== -1) ? true : false}
                 displayShow={this._displayMovieShow}/>
        }
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if( this.props.page < this.props.totalPages || this.props.favoriteList === false) {
            this.props.loadMovies();
          }
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesMovies: state.favoritesMovies.favoritesMovies
  }
}

export default connect(mapStateToProps)(MovieList);
