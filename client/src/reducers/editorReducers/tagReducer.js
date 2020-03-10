import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isEditing: false,
  options: [],
  isFetching: false,
}

const tagReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.OPEN_TAG_EDIT:
      return {
        ...state,
        isEditing: true,
      }
    case actionTypes.CLOSE_TAG_EDIT:
      return {
        ...state,
        isEditing: false,
      }
    
    case actionTypes.FETCH_TAG_OPTIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case actionTypes.FETCH_TAG_OPTIONS_SUCCESS:
      return {
        ...state,
        options: action.options,
        isFetching: false,
      }
    case actionTypes.FETCH_TAG_OPTIONS_FAILED:
      return {
        ...state,
        options: [],
        isFetching: false,
      }
    default:
      return state;
  }
}

export default tagReducer;