import { combineReducers } from "redux";
import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  list: {
    anchor: null,
    urls: [],
    isFetching: false,
  },
  upload: {
    isUploading: false,
    success: false,
    notification: false,
  }
}

const listReducer = ( state = initialState.list, action ) => {
  switch( action.type ) {
    case actionTypes.OPEN_IMAGE_LIST:
      return {
        ...state,
        anchor: action.anchor,
      }
    case actionTypes.CLOSE_IMAGE_LIST:
      return {
        ...state,
        anchor: null,
      }

    case actionTypes.FETCH_IMAGE_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case actionTypes.FETCH_IMAGE_LIST_SUCCESS:
      return {
        ...state,
        urls: action.urls,
        isFetching: false,
      }
    case actionTypes.FETCH_IMAGE_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}


const uploadReducer =  ( state = initialState.upload, action ) => {
  switch( action.type ) {
    case actionTypes.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        isUploading: true,
      }
    case actionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isUploading: false,
        success: true,
      }
    case actionTypes.UPLOAD_IMAGE_FAILED:
      return {
        ...state,
        isUploading: false,
        success: false,
      }

    case actionTypes.OPEN_UPLOAD_IMAGE_NOTIFICATION:
      return {
        ...state,
        notification: true,
      }
    case actionTypes.CLOSE_UPLOAD_IMAGE_NOTIFICATION:
      return {
        ...state,
        notification: false,
      }
    default:
      return state
  }
}

const imageReducer = combineReducers({
  list: listReducer,
  upload: uploadReducer,
})

export default imageReducer;