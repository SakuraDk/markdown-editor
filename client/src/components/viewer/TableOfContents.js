import React from 'react';

import { store } from '../../store';

export default function TableOfContents() {
  const { text } = store.getState().document;

  const renderTree = ( tree, id ) => (
    <React.Fragment key={id}> 
      <li><a href={`#${encodeURIComponent(tree[id].name.toLowerCase().replace(' ', '-'))}`}>{tree[id].name}</a></li>
      {tree[id].children.length !== 0 ? <ul>{tree[id].children.map( child => renderTree( tree, child ))}</ul> : null}
    </React.Fragment>
  );

  const tree = text !== undefined ? textToTree( text ) : null

  return (
    (text !== undefined)
    ?
    <ul>{tree[0].children.map( (child) => renderTree(tree, child) )}</ul>
    :
    <div></div>
  )
}

function textToTree(text) {
  let id = 0;

  const splited = text.split('\n')
  const root = {id: id, depth: 0, name: splited[0].replace(/^[#]{1,6} /, '')}
  let parents = [ root ];
  
  const headdings = splited.slice(1).filter((line) => line.match(/^[#]{1,6} /) !== null).map((line) => {
    id++;
    const depth = line.match(/^[#]{1,6} /)[0].length-1;
    while( depth <= parents[parents.length-1].depth ) parents.pop()

    const node = {
      id: id,
      depth: depth,
      name: line.slice(depth+1),
      parent: parents[parents.length-1].id,
    }

    if( depth >= parents[parents.length-1].depth ) parents.push( node )
    return node
  })

  const tree = [ root, ...headdings ].map( headding => {
    return({
      ...headding,
      children: headdings.filter((node) => headding.id === node.parent).map((node) => node.id)}
    )
  })

  return tree
}