import * as actionTypes from '../actions/actionTypes';

const initialState = {
  path: {
    current: '/',
    parent: '/',
    children: [],
  },

  text: '',
  tags: [],
  updated: '',

  isFetching: false,
}

const documentReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      }
    case actionTypes.CHANGE_TAG:
      if( action.tags.length !== 0 && action.tags.slice(-1)[0].match(/^[a-zA-Z]{1}[a-zA-Z0-9]+$/g) === null ) {
        return state
      }
      return {
        ...state,
        tags: action.tags.slice(0, 5),
      }
    
    case actionTypes.FETCH_DOCUMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case actionTypes.FETCH_DOCUMENT_SUCCESS:
      return {
        ...state,
        ...action.document,
        isFetching: false,
      }
    case actionTypes.FETCH_DOCUMENT_FAILED:
      return {
        ...state,
        ...initialState,
        isFetching: false,
      }
    default:
      return state;
  }
}

export default documentReducer