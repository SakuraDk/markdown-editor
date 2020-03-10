import React from 'react';
import axios from 'axios';

import { Tooltip, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { store } from '../../../store';
import { 
  saveDocumentRequest, saveDocumentSuccess, saveDocumentFailed,
  openSaveDocumentNotification, closeSaveDocumentNotification,
} from '../../../actions/actions';

export default function SaveTool() {
  const { isSaving } = store.getState().editor.save
  const { path, text, tags } = store.getState().document

  const handleSaveDocument = async() => {
    if( !isSaving ) {
      store.dispatch( saveDocumentRequest() )
      await axios.put('/api/document', {
        path: path.current,
        diff: {
          text: text,
          tags: tags,
        }
      })
      .then( (res) => {
        store.dispatch( saveDocumentSuccess() );
      })
      .catch( (err) => {
        store.dispatch( saveDocumentFailed() );
      })
      await store.dispatch( openSaveDocumentNotification() )
      await new Promise(() => setTimeout(() => store.dispatch( closeSaveDocumentNotification() ), 2*1000));
    }
  }

  return (
    <Tooltip title="save">
      <IconButton onClick={() => handleSaveDocument()}>
        <SaveIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}