import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isOpen: false,
}

const commandReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.OPEN_COMMAND_TABLE:
      return {
        ...state,
        isOpen: true,
      }
    case actionTypes.CLOSE_COMMAND_TABLE:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state;
  }
}

export default commandReducer