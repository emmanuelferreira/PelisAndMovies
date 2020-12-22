import React from 'react';
import { ActivityIndicator, StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';
import movies from '../helpers/moviesData';
import MovieList from './movieList';
import { getFilmsFromApiWithSearchedText } from '../API/tmdbapi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      movies: [],
      isLoading: false
    }
    this._loadMovies = this._loadMovies.bind(this)
  }

  _searchMovies(){
    this.page = 0
    this.total_pages = 0
    this.setState({movies: []},
      () => {
        this._loadMovies()
      }
    )
  }

  _loadMovies() {
      if (this.searchedText.length > 0) {
        this.setState({ isLoading: true }) // Lancement du chargement
        getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            movies: this.state.movies.concat(data.results),
            isLoading: false // Arrêt du chargement
          })
        })
      }
  }

  _searchTextInputChanged(text){
    this.searchedText = text;
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

  render() {

    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput}
                   placeholder='Movie tile'
                   onChangeText={(text) => this._searchTextInputChanged(text)}
                   onSubmitEditing={() => this._searchMovies()}
        />
        <Button
          title='Search'
          style={styles.button}
          onPress={() => this._searchMovies()}
        />
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
  },
  loading_container: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 24,
    textAlign: 'center',
    paddingLeft: 5
  }
});



export default Search;
