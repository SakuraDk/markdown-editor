import * as actionTypes from '../../actions/actionTypes'; 

const initialState = {
  isSaving: false,
  success: false,
  notification: false,
}
  
const saveReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.SAVE_DOCUMENT_REQUEST:
      return {
        ...state,
        isSaving: true,
      }
    case actionTypes.SAVE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isSaving: false,
        success: true,
      }
    case actionTypes.SAVE_DOCUMENT_FAILED:
      return {
        ...state,
        isSaving: false,
        success: false,
      }

    case actionTypes.OPEN_SAVE_DOCUMENT_NOTIFICATION:
      return {
        ...state,
        notification: true,
      }
    case actionTypes.CLOSE_SAVE_DOCUMENT_NOTIFICATION:
      return {
        ...state,
        notification: false,
      }
    default:
      return state;
  }
}

export default saveReducer;