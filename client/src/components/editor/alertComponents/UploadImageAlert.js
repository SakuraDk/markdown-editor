import React from 'react';

import { IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import { store } from '../../../store';
import { closeUploadImageNotification } from '../../../actions/actions';

export default function UploadImageAlert() {
  const { success, notification } = store.getState().editor.image.upload
  
  return (
    <Collapse in={notification}>
      <Alert
        severity={ success ? "success" : "error" }
        action={
          <IconButton
            size="small"
            onClick={() => {
              store.dispatch( closeUploadImageNotification() );
            }}
          >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          { success ? "Uploaded!" : "Upload Error" }
        </Alert>
    </Collapse>
  )
}
