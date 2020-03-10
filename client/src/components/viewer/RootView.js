import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Chip, Divider } from '@material-ui/core';

import { store } from '../../store';
import { 
  fetchTagOptionsRequest, fetchTagOptionsSuccess, fetchTagOptionsFailed
 } from '../../actions/actions';

export default function RootView () {
  const { options, isFetching } = store.getState().editor.tag;
  const tree = React.useRef(null)

  const renderTree = ( tree, path ) => (
    <React.Fragment key={path}> 
      <li><Link to={path}>{path.split('/').slice(-1)[0] + (tree[path].length !== 0 ? '/' : '')}</Link></li>
      {tree[path].length !== 0 ? <ul>{tree[path].map( child => renderTree( tree, child ))}</ul> : null}
    </React.Fragment>
  );

  React.useEffect(() => {
    const getRootData = async() => {
      store.dispatch( fetchTagOptionsRequest() )
      
      axios.get('/api/documents')
      .then((res) => {
        tree.current = res.data
      })
      .catch((err) => {
        console.log(new Error(err))
      })

      axios.get('/api/options')
      .then((res) => {
        store.dispatch( fetchTagOptionsSuccess( res.data ) )
      })
      .catch((err) => {
        store.dispatch( fetchTagOptionsFailed() )
        console.log(new Error(err))
      })
    }

    getRootData()
  }, [])

  return (
    <React.Fragment>
      <h1 style={{fontSize: '3em'}}>Root</h1>
      <div style={{width: '100%', height: '24px', margin: '10px 0', overflowX: 'auto', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none', '&::WebkitScrollbar': {display: 'none'}}}>
        {!isFetching && options.map( (tag, index) => (
          <Chip key={index} variant="outlined" size="small" label={tag} style={{margin: '0 2px'}}/>
        ))}
      </div>
      <Divider />
      <h2>All Documents</h2>
      <nav className='table-of-documents'>
        <ul>
          {!isFetching && tree.current !== null && renderTree(tree.current, "/")}
        </ul>
      </nav>
    </React.Fragment>
  )
}