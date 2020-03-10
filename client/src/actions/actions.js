import * as actionTypes from './actionTypes';
// document
export const changeText = ( text ) => ({
  type: actionTypes.CHANGE_TEXT,
  text: text,
})
export const changeTag = ( tags ) => ({
  type: actionTypes.CHANGE_TAG,
  tags: tags,
})

export const fetchDocumentRequest = () => ({
  type: actionTypes.FETCH_DOCUMENT_REQUEST
})
export const fetchDocumentSuccess = ( document ) => ({
  type: actionTypes.FETCH_DOCUMENT_SUCCESS,
  document: document
})
export const fetchDocumentFailed = () => ({
  type: actionTypes.FETCH_DOCUMENT_FAILED
})



// viewer
// - nav
export const openNav = () => ({
  type: actionTypes.OPEN_NAV,
})
export const closeNav = () => ({
  type: actionTypes.CLOSE_NAV,
})

// - create
export const changeNewPath = ( newPath ) => ({
  type: actionTypes.CHANGE_NEW_PATH,
  newPath: newPath,
})

export const openCreateDialog = () => ({
  type: actionTypes.OPEN_CREATE_DIALOG,
})
export const closeCreateDialog = () => ({
  type: actionTypes.CLOSE_CREATE_DIALOG,
})

export const createDocumentRequest = () => ({
  type: actionTypes.CREATE_DOCUMENT_REQUEST,
})
export const createDocumentSuccess = () => ({
  type: actionTypes.CREATE_DOCUMENT_SUCCESS,
})
export const createDocumentFailed = () => ({
  type: actionTypes.CREATE_DOCUMENT_FAILED,
})

// - delete
export const openDeleteDialog = () => ({
  type: actionTypes.OPEN_DELETE_DIALOG,
})
export const closeDeleteDialog = () => ({
  type: actionTypes.CLOSE_DELETE_DIALOG,
})

export const deleteDocumentRequest = () => ({
  type: actionTypes.DELETE_DOCUMENT_REQUEST,
})
export const deleteDocumentSuccess = () => ({
  type: actionTypes.DELETE_DOCUMENT_SUCCESS,
})
export const deleteDocumentFailed = () => ({
  type: actionTypes.DELETE_DOCUMENT_FAILED,
})




// editor
// - save
export const saveDocumentRequest = () => ({
  type: actionTypes.SAVE_DOCUMENT_REQUEST,
})
export const saveDocumentSuccess = () => ({
  type: actionTypes.SAVE_DOCUMENT_SUCCESS,
})
export const saveDocumentFailed = () => ({
  type: actionTypes.SAVE_DOCUMENT_FAILED,
})

export const openSaveDocumentNotification = () => ({
  type: actionTypes.OPEN_SAVE_DOCUMENT_NOTIFICATION
})
export const closeSaveDocumentNotification = () => ({
  type: actionTypes.CLOSE_SAVE_DOCUMENT_NOTIFICATION
})


// - image
export const openImageList = ( anchor ) => ({
  type: actionTypes.OPEN_IMAGE_LIST,
  anchor: anchor,
})
export const closeImageList = () => ({
  type: actionTypes.CLOSE_IMAGE_LIST,
})

export const fetchImageListRequest = () => ({
  type: actionTypes.FETCH_IMAGE_LIST_REQUEST,
})
export const fetchImageListSuccess = ( urls ) => ({
  type: actionTypes.FETCH_IMAGE_LIST_SUCCESS,
  urls: urls,
})
export const fetchImageListFailed = () => ({
  type: actionTypes.FETCH_IMAGE_LIST_FAILED,
})

export const uploadImageRequest = () => ({
  type: actionTypes.UPLOAD_IMAGE_REQUEST,
})
export const uploadImageSuccess = () => ({
  type: actionTypes.UPLOAD_IMAGE_SUCCESS,
})
export const uploadImageFailed = () => ({
  type: actionTypes.UPLOAD_IMAGE_FAILED,
})

export const openUploadImageNotification = () => ({
  type: actionTypes.OPEN_UPLOAD_IMAGE_NOTIFICATION,
})
export const closeUploadImageNotification = () => ({
  type: actionTypes.CLOSE_UPLOAD_IMAGE_NOTIFICATION,
})


// - tag
export const openTagEdit = () => ({
  type: actionTypes.OPEN_TAG_EDIT,
})
export const closeTagEdit = () => ({
  type: actionTypes.CLOSE_TAG_EDIT,
})

export const fetchTagOptionsRequest = () => ({
  type: actionTypes.FETCH_TAG_OPTIONS_REQUEST,
})
export const fetchTagOptionsSuccess = ( options ) => ({
  type: actionTypes.FETCH_TAG_OPTIONS_SUCCESS,
  options: options,
})
export const fetchTagOptionsFailed = () => ({
  type: actionTypes.FETCH_TAG_OPTIONS_FAILED,
})

// - command
export const openCommandTable = () => ({
  type: actionTypes.OPEN_COMMAND_TABLE,
})
export const closeCommandTable = () => ({
  type: actionTypes.CLOSE_COMMAND_TABLE,
})

