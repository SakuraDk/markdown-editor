import React from 'react';

import { store } from '../../store';
import useMd from '../markdown/md';

const style = {
  overflowY: 'auto',
  margin: '0% 2% 2%',
  padding: '0 2% 0',
  border: 'none',
  width: '96%',
  height: '98%',
  resize: 'none',
  color: '#ffffff',
  backgroundColor: '#424242'
}

const md = useMd( true );

export default function ViewArea() {
  const { text } = store.getState().document

  return (
    <div
      dangerouslySetInnerHTML={{ __html: md.render( text ) }}
      className="markdown"
      style={style}
    />
  )
}
