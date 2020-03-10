import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  newPath: '',
  isOpen: false,
  isCreating: false,
  success: false,
}

const createReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.CHANGE_NEW_PATH:
      return {
        ...state,
        newPath: action.newPath,
      }
    
    case actionTypes.OPEN_CREATE_DIALOG:
      return {
        ...state,
        isOpen: true,
      }
    case actionTypes.CLOSE_CREATE_DIALOG:
      return {
        ...state,
        isOpen: false,
      }
    
    case actionTypes.CREATE_DOCUMENT_REQUEST:
      return {
        ...state,
        isCreating: true,
      }
    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        newPath: '',
        isCreating: false,
        success: true,
      }
    case actionTypes.CREATE_DOCUMENT_FAILED:
      return {
        ...state,
        newPath: '',
        isCreating: false,
        success: false,
      }
    default:
      return state
  }
}

export default createReducer;