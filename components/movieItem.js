import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { getImageFromApi } from '../API/tmdbapi';
import FadeIn from '../animations/fadeIn'

class Movie extends React.Component {

  _displayFavoriteImage(){
    if(this.props.isMovieFavorite){
      return(
        <Image
          style={styles.favorite_image}
          source={require('../assets/ic_favorite.png')}
          />
      )
    }
  }

  render (){
    const {movie, displayShow} = this.props
    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress = {()=> {
            displayShow(movie.id)
          }}
        >
          <Image
            style={styles.movie_image}
            source={{ uri: getImageFromApi(movie.poster_path) }}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{movie.original_title}</Text>
              <Text style={styles.vote_text}>{movie.vote_average}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{movie.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>Released on {movie.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    height: 190
  },
  movie_image: {
    flex: 1,
    height: 180,
    margin: 5,
    justifyContent: 'center'
  },
  content_container: {
    flex: 2,
    height: 180
  },
    header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 30,
    height: 30,
    marginRight: 5
  }

});

export default Movie;
