import React from 'react';

import BackViewer from './editorToolbarComponents/BackViewer';
import SaveTool from './editorToolbarComponents/SaveTool';
import { ImageList, UploadImage } from './editorToolbarComponents/ImageTools';
import { EditTag, TagField } from './editorToolbarComponents/TagTool';
import CommandInfoTool from './editorToolbarComponents/CommandInfoTool';

export default function EditorToolbar() {
  return (
    <div style={{ margin: '0% 1%', width: '98%', display: 'inline-flex'}}>
      <div style={{width: '44px'}}>
        <BackViewer />
      </div>
      <div style={{width: '44px'}}>
        <SaveTool />
      </div>
      <div style={{width: '44px'}}>
        <ImageList />
      </div>
      <div style={{width: '44px'}}>
        <UploadImage />
      </div>
      <div style={{width: '44px'}}>
        <EditTag />
      </div>
      <div style={{width: 'calc(100% - 264px)'}}>
        <TagField />
      </div>
      <div style={{width: '44px'}}>
        <CommandInfoTool />
      </div>
    </div>
  )
}