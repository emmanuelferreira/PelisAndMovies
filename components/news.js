import React from 'react';
import {View, StyleSheet, ActivityIndicator } from 'react-native';
import MovieList from './movieList'
import {getLatestMoviesFromApi} from '../API/tmdbapi'

class News extends React.Component {

  constructor(props){
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      movies: [],
      isLoading: false
    }
    this._loadMovies = this._loadMovies.bind(this)
  }

  componentDidMount(){
    this._loadMovies()
  }

   _loadMovies() {

      this.setState({ isLoading: true })
      getLatestMoviesFromApi(this.page + 1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            movies: this.state.movies.concat(data.results),
            isLoading: false
          })
        })
  }

  _displayLoading(){
    if(this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  render(){
    return(
      <View style={styles.main_container}>
        <MovieList
          movies={this.state.movies}
          navigation={this.props.navigation}
          page={this.page}
          totalPages={this.totalPages}
          loadMovies={this._loadMovies}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 10
  }
});

export default News
