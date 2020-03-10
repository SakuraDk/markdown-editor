import React from 'react';
import axios from 'axios';
import { useLocation, useHistory } from "react-router-dom";

import Editor from './editor/Editor';
import Viewer from './viewer/Viewer';

import { store } from '../store';
import { 
  fetchDocumentRequest, fetchDocumentSuccess, fetchDocumentFailed
 } from '../actions/actions';

export default function EditorViewer () {
  const location = useLocation();
  const history = useHistory();
  
  React.useEffect( () => {
    document.title = location.pathname;
    store.dispatch( fetchDocumentRequest() )
    axios.get('/api/document', {
      params: {
        path: encodeURIComponent(location.pathname)
      }
    })
    .then( (res) => {
      if( !res.data ) history.push('/')
      else store.dispatch( fetchDocumentSuccess( res.data ) )
    })
    .catch( (err) => {
      store.dispatch( fetchDocumentFailed() )
      console.log( new Error(err) );
    })
  }, [location.pathname])
  

  return (
    location.search !== '?edit'
    ?
    <Viewer />
    :
    <Editor />
  )
}