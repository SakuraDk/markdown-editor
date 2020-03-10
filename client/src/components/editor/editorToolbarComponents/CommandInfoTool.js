import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { Modal, Fade } from '@material-ui/core';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import { store } from '../../../store';
import { openCommandTable, closeCommandTable } from '../../../actions/actions';

export default function CommandInfoTool() {
  const { isOpen } = store.getState().editor.command

  return (
    <React.Fragment>
      <Tooltip title="command info">
        <IconButton onClick={() => store.dispatch( openCommandTable() )}>
          <InfoIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
      <Modal
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={isOpen}
        onClose={() => store.dispatch( closeCommandTable() )}
        closeAfterTransition
      >
        <Fade in={isOpen}>
          <div style={{backgroundColor: '#303030'}}>
            <h2>Command List: </h2>
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Cmd</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Cmd</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commands}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}

const commandList = [
  {command: "Ctrl(⌘) + B", description: "<b>Bold</b>"},
  {command: "Ctrl(⌘) + I", description: "<i>Italic</i>"},
  {command: "Ctrl(⌘) + U", description: "<ins>UnderLine</ins>"},
  {command: "Ctrl(⌘) + M", description: "<mark>Mark</mark>"},

  {command: "Alt + M", description: "<math>Math</math>"},
  {command: "Alt + C", description: "<code>Code</code>"},

  {command: "", description: ""},
  {command: "", description: ""},

  {command: "Ctrl(⌘) + Z", description: "Undo"},
  {command: "Ctrl(⌘) + Y<br/>Ctrl(⌘) + Shift + Z", description: "Redo"},
  {command: "Ctrl(⌘) + S", description: "Save"},
]

const commands = [];
for( let i=0; i < commandList.length/2; i++ ) {
  commands.push(
    <TableRow key={i}>
      <TableCell component="th" scope="row" dangerouslySetInnerHTML={{ __html: commandList[2*i].command }}/>
      <TableCell dangerouslySetInnerHTML={{ __html: commandList[2*i].description }}/>
      <TableCell component="th" scope="row" dangerouslySetInnerHTML={{ __html: 2*i+1 < commandList.length ? commandList[2*i+1].command : "" }}/>
      <TableCell dangerouslySetInnerHTML={{ __html: 2*i+1 < commandList.length ? commandList[2*i+1].description : "" }}/>
    </TableRow> 
  )
}