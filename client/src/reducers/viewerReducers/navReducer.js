import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  isOpen: false,
}

const navReducer = ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.OPEN_NAV:
      return {
        ...state,
        isOpen: true,
      }
    case actionTypes.CLOSE_NAV:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}

export default navReducer;