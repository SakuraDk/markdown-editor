import { combineReducers } from "redux";
import navReducer from "./viewerReducers/navReducer";
import createReducer from "./viewerReducers/createReducer";
import deleteReducer from "./viewerReducers/deleteReducer";

const viewerReducer = combineReducers({
  nav: navReducer,
  create: createReducer,
  delete: deleteReducer,
})

export default viewerReducer;