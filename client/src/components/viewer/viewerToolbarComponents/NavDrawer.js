import React from 'react';
import {Link} from "react-router-dom";

import { Tooltip, IconButton } from '@material-ui/core';
import { SwipeableDrawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SubjectIcon from '@material-ui/icons/Subject';
import DescriptionIcon from '@material-ui/icons/Description';

import { store } from '../../../store';
import { openNav, closeNav } from '../../../actions/actions';

export default function NavDrawer() {
  const { isOpen } = store.getState().viewer.nav
  const { parent, children } = store.getState().document.path

  return (
    <React.Fragment>
      <Tooltip title="drawer">
        <IconButton
          onClick={() => store.dispatch( openNav() )}
          edge="start"
        >
            <MenuIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        open={isOpen}
        onClose={() => store.dispatch( closeNav() )}
        onOpen={() => store.dispatch( closeNav() )}
      >
        <nav
          className="drawer"
          onClick={() => store.dispatch( closeNav() )}
          onKeyDown={() => store.dispatch( closeNav() )}
        >
          <List>
            <Link to='/' key='Home'>
              <ListItem button>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Home" secondary='/' />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to={parent} key='Prarent'>
              <ListItem button>
                <ListItemIcon><SubjectIcon /></ListItemIcon>
                <ListItemText primary="Parent documents" secondary={parent} />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem key='Children'>
              <ListItemText primary="Children"/>
            </ListItem>
            {children.map((child, index) => (
              <Link to={child} key={`child${index}`}>
                <ListItem button>
                  <ListItemIcon><DescriptionIcon /></ListItemIcon>
                  <ListItemText primary={child.split('/').slice(-1)[0]} secondary={child} />
                </ListItem>
              </Link>
            ))}
          </List>
        </nav>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
