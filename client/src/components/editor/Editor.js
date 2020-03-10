import React from 'react';

import EditorToolbar from './EditorToolbar';
import EditArea from './EditArea';
import ViewArea from './ViewArea';
import Alerts from './Alerts'


export default function Editor() {
  return (
    <React.Fragment>
      <div id="editor">
        <div className="header">
          <EditorToolbar />
        </div>
        <div className="left">
          <EditArea />
        </div>
        <div className="right">
          <ViewArea />
        </div>
        <div className="alert">
          <Alerts />
        </div>
      </div>
    </React.Fragment>
  )
}

