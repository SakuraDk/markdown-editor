import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import App from './App';

import './styles/editor.css';
import './styles/viewer.css';
import './styles/markdown.css';
import * as serviceWorker from './serviceWorker';

const render = ( ) => { 
  ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe( () => {
  render();
})

render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
