import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import EditorViewer from './components/EditorViewer';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

export default function App () { 
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/" component={EditorViewer} />
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  )
}
