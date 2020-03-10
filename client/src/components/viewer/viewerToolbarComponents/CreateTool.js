import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { IconButton, Tooltip } from '@material-ui/core';
import { FormControl, Input, InputLabel, InputAdornment, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import { store } from '../../../store';
import { changeNewPath, 
  openCreateDialog, closeCreateDialog, 
  createDocumentRequest, createDocumentSuccess, createDocumentFailed,
} from '../../../actions/actions';

export default function CreateTool () {
  const history = useHistory();

  const { current, children } = store.getState().document.path;
  const { newPath, isOpen, isCreating } = store.getState().viewer.create;
  const child = current + (current.slice(-1) !== '/' ? '/' : '') + newPath;

  const handleCreate = async() => {
    if( !isCreating ) {
      store.dispatch( createDocumentRequest() )
      await axios.post('/api/document', {
        path: child,
        parent: current,
      })
      .then( (res) => {
        axios.put('/api/document', {
          path: current,
          diff: {
            children: [ ...children, child ],
          }
        }).then( () => {
          store.dispatch( createDocumentSuccess() )
          history.push(current + (current.slice(-1) !== '/' ? '/' : '') + newPath) 
        })
        .catch( (err) => {
          store.dispatch( createDocumentFailed() )
          console.log(new Error(err))
        })
      })
      .catch( (err) => {
        store.dispatch( createDocumentFailed() )
        console.log(new Error(err))
      })
      store.dispatch( closeCreateDialog() );     
    }
  }

  return (
    <React.Fragment>
    <Tooltip title="create">
      <IconButton onClick={() => store.dispatch( openCreateDialog() )}>
        <NoteAddIcon fontSize="small" />
      </IconButton>
    </Tooltip>
      <Dialog open={isOpen} onClose={() => store.dispatch( closeCreateDialog() )}>
      <DialogContent  style={{width: '400px'}}>
        <DialogTitle>
          Create child document
        </DialogTitle>
          <FormControl fullWidth>
            <InputLabel>child path</InputLabel>
            <Input
              autoFocus
              value={newPath}
              onChange={(e) => store.dispatch( changeNewPath(e.target.value) )}
              startAdornment={<InputAdornment position="start">{current+ (current.slice(-1) !== '/' ? '/' : '')}</InputAdornment>}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => store.dispatch( closeCreateDialog() )} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCreate()} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}