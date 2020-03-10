import { combineReducers } from "redux";
import documentReducer from "./documentReducer";
import editorReducer from "./editorReducer";
import viewerReducer from "./viewerReducer";

const rootReducer = combineReducers({
  document: documentReducer,
  editor: editorReducer,
  viewer: viewerReducer,
})

export default rootReducer;