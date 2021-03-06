import React from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';
import copy from 'copy-to-clipboard';

import { Tooltip, IconButton, Popover, GridList, GridListTile } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { store } from '../../../store';
import {
  openImageList, closeImageList,
  fetchImageListRequest, fetchImageListSuccess, fetchImageListFailed,
  uploadImageRequest, uploadImageSuccess, uploadImageFailed,
  openUploadImageNotification, closeUploadImageNotification,
 } from '../../../actions/actions';

export function ImageList() {
  const { anchor, urls, isFetching } = store.getState().editor.image.list

  const handleOpenImageList = (e) => {
    store.dispatch( openImageList( e.currentTarget ) );
    store.dispatch( fetchImageListRequest() )
    axios.get('/api/images')
    .then( (res) => {
      store.dispatch( fetchImageListSuccess( res.data ) )
    })
    .catch( (err) => {
      store.dispatch( fetchImageListFailed() )
      console.log(new Error(err))
    })
  }

  const handleCopyScript = ( url ) => {
    copy(`![${url.split('/').slice(-1)[0]}](${url})`)
    store.dispatch( closeImageList( ) )
  }

  return (
    <React.Fragment>
      <Tooltip title="image list">
        <IconButton onClick={(e) => handleOpenImageList(e)}>
          <PhotoLibraryIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => store.dispatch( closeImageList() )}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <GridList>
          {!isFetching && urls.map((url, index) => (
            <GridListTile key={index} cols={1} style={{width: 100, height: 100}}>
              <img src={url} alt={url.split('/').slice(-1)[0]} onClick={() => handleCopyScript(url) }/>
            </GridListTile>
          ))}
        </GridList>
      </Popover>
    </React.Fragment>
  )
}

export function UploadImage() {
  const { isUploading } = store.getState().editor.image.upload

  const handleUploadImage = async(e) => {
    if( !isUploading ) {
      const file = e.target.files[0];
      
      await store.dispatch( uploadImageRequest() );

      await new Compressor( file, {
        quality: 0.6,
        maxWidth: 500,
        maxHeight: 500,
        success( result ) {
          console.log(result)
          const formData = new FormData();
          formData.append("file", result, file.name);
          const config = { headers: {"content-type": "multipart/form-data"} }

          axios.post('/api/images', formData, config )
          .then( (res) => {
            console.log(formData)
            store.dispatch( uploadImageSuccess() )
            store.dispatch( openUploadImageNotification() )
            const url = res.data
            copy(`![${url.split('/').slice(-1)[0]}](${url})`)
          })
          .catch( (err) => {
            store.dispatch( uploadImageFailed() )
            store.dispatch( openUploadImageNotification() )
            console.log(new Error(err))
          })
        },
        error( err ) {
          store.dispatch( uploadImageFailed() )
          store.dispatch( openUploadImageNotification() )
          console.log(new Error(err))
        }
      })
      setTimeout( () => { store.dispatch( closeUploadImageNotification() ) }, 2000)
    }
  }


  return (
    <Tooltip title="upload image">
      <IconButton component="label">
        <AddPhotoAlternateIcon fontSize="small" />
        <input type="file" style={{ display: "none" }} accept="image/*" onChange={(e) => {handleUploadImage(e)} } />
      </IconButton>
    </Tooltip>
  )
}