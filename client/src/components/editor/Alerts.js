import React from 'react';
import SaveDocumentAlert from './alertComponents/SaveDocumentAlert';
import UploadImageAlert from './alertComponents/UploadImageAlert';

export default function Alerts() {
  return (
    <React.Fragment>
      <SaveDocumentAlert />
      <UploadImageAlert />
    </React.Fragment>
  )
}