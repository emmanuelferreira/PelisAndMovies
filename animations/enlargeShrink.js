import React from 'react'
import { Animated, Dimensions } from 'react-native'

class EnlargeShrink extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imageSize: new Animated.Value(this._getSize())
    }
  }

  _getSize(){
    if(this.props.shouldEnlarge){
      return 80
    }
    return 40
  }

  componentDidUpdate() {
    Animated.spring(
      this.state.imageSize,
      {
        toValue: this._getSize()
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{width: this.state.imageSize, height: this.state.imageSize }}
      >
      {this.props.children}
      </Animated.View>
    )
  }
}

export default EnlargeShrink
