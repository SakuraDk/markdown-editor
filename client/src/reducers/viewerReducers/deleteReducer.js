import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isOpen: false,
  isDeleting: false,
  success: false,
}

const deleteReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.OPEN_DELETE_DIALOG:
      return {
        ...state,
        isOpen: true,
      }
    case actionTypes.CLOSE_DELETE_DIALOG:
      return {
        ...state,
        isOpen: false,
      }
    
    case actionTypes.DELETE_DOCUMENT_REQUEST:
      return {
        ...state,
        isDeleting: true,
      }
    case actionTypes.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        success: true,
      }
    case actionTypes.DELETE_DOCUMENT_FAILED:
      return {
        ...state,
        isDeleting: false,
        success: false,
      }
    default:
      return state
  }
}

export default deleteReducer;