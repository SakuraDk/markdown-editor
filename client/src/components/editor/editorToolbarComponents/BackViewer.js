import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';


export default function BackViewer() {
  return (
    <Tooltip title="viewer">
      <Link to={`${useLocation().pathname}`}>
        <IconButton>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Link>
    </Tooltip>
  )
}