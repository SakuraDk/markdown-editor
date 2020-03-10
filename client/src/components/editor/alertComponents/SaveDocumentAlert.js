import React from 'react';

import { IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import { store } from '../../../store';
import { closeSaveDocumentNotification } from '../../../actions/actions';

export default function SaveDocumentAlert() {
  const { success, notification } = store.getState().editor.save

  return (
    <Collapse in={notification}>
      <Alert
        severity={ success ? "success" : "error" }
        action={
          <IconButton
            size="small"
            onClick={() => {
              store.dispatch( closeSaveDocumentNotification() )
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        { success ? "Save Text Success!" : "Save Text Failed!" }
      </Alert>
    </Collapse>
  )
}