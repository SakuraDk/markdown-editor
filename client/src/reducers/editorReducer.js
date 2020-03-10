import { combineReducers } from "redux";
import saveReducer from "./editorReducers/saveReducer";
import imageReducer from "./editorReducers/imageReducer";
import tagReducer from "./editorReducers/tagReducer";
import commandReducer from "./editorReducers/commandReducer";

const editorReducer = combineReducers({
  save: saveReducer,
  image: imageReducer,
  tag: tagReducer,
  command: commandReducer,
})

export default editorReducer;