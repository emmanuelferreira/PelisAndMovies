const initialState = { avatar: require('../../assets/ic_tag_faces.png') }


export default function avatarReducer (state = initialState, action){
  let nextState
  switch (action.type){
    case 'SET_AVATAR':
      nextState = {
        ...state,
        avatar: action.value
      }

      return nextState || state;
    default:
      return state;
  }

}
