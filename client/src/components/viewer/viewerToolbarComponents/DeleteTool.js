import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { IconButton, Tooltip } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { store } from '../../../store';
import { 
  openDeleteDialog, closeDeleteDialog,
  deleteDocumentRequest, deleteDocumentSuccess, deleteDocumentFailed
 } from '../../../actions/actions';

export default function DeleteTool () {
  const history = useHistory();

  const { parent, current, children } = store.getState().document.path;
  const { isOpen, isDeleting } = store.getState().viewer.delete;

  const handleDelete = async() => {
    if( !isDeleting ) {
      store.dispatch( deleteDocumentRequest() )
      await axios.delete('/api/document', {
        data: {
          parent: parent,
          path: current,
        }
      })
      .then( (res) => {
        store.dispatch( deleteDocumentSuccess() )
        history.push(parent)
      })
      .catch( (err) => {
        store.dispatch( deleteDocumentFailed() )
        console.log(new Error(err))
      })
      await store.dispatch( closeDeleteDialog() )
    }
  }

  return (
    <React.Fragment>
    <Tooltip title="delete">
      <IconButton onClick={() => store.dispatch( openDeleteDialog() )}>
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </Tooltip>
      <Dialog open={isOpen} onClose={() => store.dispatch( closeDeleteDialog() )}>
      <DialogContent  style={{width: '400px'}}>
        <DialogTitle>
          { children.length === 0 ? "Are you sure you want to delete ?" : "You cannot delete because children documents exist" }
        </DialogTitle>
      </DialogContent>
        <DialogActions>
          <Button onClick={() => store.dispatch( closeDeleteDialog() )} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} color="primary" disabled={children.length !== 0}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}