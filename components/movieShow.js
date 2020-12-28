import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share } from 'react-native'
import { getMovieDetailsFromApi, getImageFromApi } from '../API/tmdbapi'
import moment from 'moment'
import numeral from 'numeral'
import EnlargeShrink from '../animations/enlargeShrink'

class MovieShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      movie: undefined,
      isLoading: true
    }
    this._shareMovie = this._shareMovie.bind(this)
  }

  componentDidMount(){
    const favoriteMovieIndex = this.props.favoritesMovies.findIndex((item) => {
      item.id === this.props.navigation.state.params.idMovie
    })
    if(favoriteMovieIndex !== -1){
      this.setState(
        {
          movie: this.props.favoritesMovies[favoriteMovieIndex],
          isLoading: false
        },
        () => { this._updateNavigationParams()}
      )
      return
    }
    getMovieDetailsFromApi(this.props.navigation.state.params.idMovie)
    .then( data => {
      this.setState(
        { movie: data,
          isLoading:false},
        () => { this._updateNavigationParams()}
      )
    })
  }

   _displayLoading(){
    if(this.state.isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _toggleFavorite(){
    const action = { type: "TOGGLE_FAVORITE", value: this.state.movie }
    this.props.dispatch(action)
  }

  _displayFavoriteImage(){
    var imageFavorite = require('../assets/ic_favorite_border.png')
    let shouldEnlarge = false
    if(this.props.favoritesMovies.findIndex(item => item.id === this.state.movie.id) !== -1){
      imageFavorite = require('../assets/ic_favorite.png')
      shouldEnlarge = true
    }
    return(
      <EnlargeShrink
        shouldEnlarge={shouldEnlarge}
      >
        <Image
            source={imageFavorite}
            style={styles.favorite_image}
        />
      </EnlargeShrink>
    )
  }

  _displayMovie(){
    const {movie} = this.state
    if(this.state.movie != undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
          <Image
          style={styles.movie_image}
          source={{ uri: getImageFromApi(movie.backdrop_path) }}
          />
          <Text style={styles.title_text}> {movie.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}> {movie.overview}</Text>
          <Text style={styles.default_text}>
            Released on {moment(movie.release_date).subtract(10, 'days').calendar()}
          </Text>
          <Text style={styles.default_text}>Rate: {movie.vote_average}</Text>
          <Text style={styles.default_text}># votes: {movie.vote_count}</Text>
          <Text style={styles.default_text}>Budget: {numeral(movie.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>
            Genre(s): {movie.genres.map((genre) => {
              return (genre.name);
              }).join(' / ')
            }
          </Text>
          <Text style={styles.default_text}>
            Producer(s): { movie.production_companies.map((producer) => {
              return (producer.name);
            }).join(' / ')
          }
          </Text>
          <Text style={styles.description_text}> {movie.overview}</Text>
          <Text style={styles.default_text}>
            Released on {moment(movie.release_date).subtract(10, 'days').calendar()}
          </Text>
          <Text style={styles.description_text}> {movie.overview}</Text>
          <Text style={styles.default_text}>
            Released on {moment(movie.release_date).subtract(10, 'days').calendar()}
          </Text>
        </ScrollView>
      )
    }
  }

   _shareMovie(){
    const {movie} = this.state
    Share.share({title: movie.title,
      message: movie.overview
    })
  }

  _displayFloatingActionButton() {
    const { movie } = this.state
    if (movie != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareMovie()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic_share.android.png')} />
        </TouchableOpacity>
      )
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    if( params.movie !== undefined && Platform.OS === "ios"){
      return{
         headerRight: <TouchableOpacity
                        style={styles.share_touchable_headerrightbutton}
                        onPress={() => params.shareMovie()}>
                        <Image
                          style={styles.share_image}
                          source={require('../assets/ic_share.png')} />
                      </TouchableOpacity>
      }
    }
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareMovie: this._shareMovie,
      movie: this.state.movie
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayMovie()}
        {this._displayFloatingActionButton()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  movie_image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center'
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesMovies: state.favoritesMovies.favoritesMovies
  }
}


export default connect(mapStateToProps)(MovieShow);
