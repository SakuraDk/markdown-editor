import React from 'react';
import axios from 'axios';

import { Tooltip, IconButton } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import { Chip, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { store } from '../../../store';
import { changeTag,
  openTagEdit, closeTagEdit,
  fetchTagOptionsRequest, fetchTagOptionsSuccess, fetchTagOptionsFailed
 } from '../../../actions/actions';


export function EditTag() {
  const { isEditing } = store.getState().editor.tag

  const handleEditTag = () => {
    if( isEditing ) {
      store.dispatch( closeTagEdit() )
    }else{
      store.dispatch( openTagEdit() )
      store.dispatch( fetchTagOptionsRequest() )
      axios.get('/api/options')
      .then((res) => {
        store.dispatch( fetchTagOptionsSuccess( res.data ) )
      })
      .catch((err) => {
        store.dispatch( fetchTagOptionsFailed( ) )
        console.log(new Error(err))
      })
    }
  }

  return (
    <Tooltip title={ isEditing ? "fix tag" : "edit tag"}>
      <IconButton onClick={() => handleEditTag()}>
        { isEditing ? <LabelOffIcon fontSize="small" /> : <LabelIcon fontSize="small" /> }
      </IconButton>
    </Tooltip>
  )
}

export function TagField() {
  const { tags } = store.getState().document
  const { isEditing, options, isFetching } = store.getState().editor.tag

  return (
    isEditing
    ?
    <Autocomplete
      freeSolo
      multiple
      size="small"
      options={options}
      value={tags}
      onChange={(e, newTags) => store.dispatch( changeTag( newTags ) )}
      filterSelectedOptions
      renderTags={(value, getTagProps) =>
        !isFetching && value.map((tag, index) => (
          <Chip key={index} variant="outlined" size='small' label={tag} {...getTagProps({ index })}/>
        ))
      }
      renderInput={params => (
        <TextField {...params} variant="standard" placeholder="Favorites" autoFocus={true} style={{top: 10, backgroundColor: '#303030'}}/>
      )}
    />
    :
    <div style={{width: '100%', height: '24px', margin: '10px 0', overflowX: 'auto', textOverflowX: 'ellipsis', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none', '&::WebkitScrollbar': {display: 'none'}}}>
      {tags.map( (tag, index) => (
        <Chip key={index} variant="outlined" size="small" label={tag} style={{margin: '0 2px'}}/>
      ))}
    </div>
  )
}
