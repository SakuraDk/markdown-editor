import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

export default function EditTool () {
  return (
    <Tooltip title="edit">
      <Link to={`${useLocation().pathname}?edit`} >
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
      </Link>
    </Tooltip>
  )
}


