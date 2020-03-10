import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';

import NavDrawer from './viewerToolbarComponents/NavDrawer';
import EditTool from './viewerToolbarComponents/EditTool';
import CreateTool from './viewerToolbarComponents/CreateTool';
import DeleteTool from './viewerToolbarComponents/DeleteTool';

import { store } from '../../store';

export default function ViewerToolbar() {
  const { current } = store.getState().document.path

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <NavDrawer />
        <div style={{flexGrow: 1, overflowX: 'auto', textOverflowX: 'ellipsis', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none', '&::WebkitScrollbar': {display: 'none'}}}>
          { current }
        </div>
        { current !== '/' && <EditTool />}
        <CreateTool />
        { current !== '/' && <DeleteTool />}
      </Toolbar>
    </AppBar>
  )
}