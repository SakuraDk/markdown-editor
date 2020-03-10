import React from 'react';
import { Switch, Route } from "react-router-dom";

import { Hidden } from '@material-ui/core';

import ViewerToolbar from './ViewerToolbar';
import RootView from './RootView';
import MarkdownView from './MarkdownView';
import TableOfContents from './TableOfContents';

export default function Viewer() {
  const idToIndex = React.useRef({})
  const indexToLi = React.useRef({})
  const activeIndexes = React.useRef([])

  React.useEffect( () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const node = id === null ? null : document.querySelector(`nav.table-of-contents ul li a[href="#${id}"]`)
        if(node !== null) {
          if (entry.intersectionRatio > 0) {
            activeIndexes.current.push(idToIndex.current[id])
            node.parentElement.classList.add('active');
            if( activeIndexes.current.length > 0 ) {
              const li = indexToLi.current[ Math.min(...activeIndexes.current) ]
              li !== undefined && li.scrollIntoView(true)
            }
          } else {
            activeIndexes.current = activeIndexes.current.filter((index) => index !== idToIndex.current[id])
            node.parentElement.classList.remove('active');
          }
        }
      });
    });
    document.querySelectorAll('article section').forEach((section, index) => {
      idToIndex.current[section.getAttribute('id')] = index;
      document.querySelectorAll('nav.table-of-contents ul li a').forEach((li, index) => {
        indexToLi.current[idToIndex.current[li.getAttribute('href').slice(1)]] = li;
      })
      observer.observe(section);
    });
  })

  return (
    <React.Fragment>
    <header>
      <ViewerToolbar />
    </header>
    <div id="viewer">
      <main>
        <div className='left'>
          <article>
            <Switch>
              <Route exact path='/' component={RootView} />
              <Route path='/' component={MarkdownView} />
            </Switch>
          </article>
        </div>
        <Hidden smDown>
          <nav className='table-of-contents'>
            <TableOfContents />
          </nav>
        </Hidden>
      </main>
    </div>
    </React.Fragment>
  );
}