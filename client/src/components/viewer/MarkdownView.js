import React from 'react';
import { Divider, Chip } from '@material-ui/core';
import { useLocation } from "react-router-dom";

import $script from 'scriptjs';

import { store } from '../../store';

import useMd from '../markdown/md';
const md = useMd( false );

export default function MarkdownView() {
  const location = useLocation();
  const { text, tags, updated } = store.getState().document

  React.useEffect(() => {
    const applyTwitter = async() => await new Promise(() => setTimeout(() =>  {
      $script('https://platform.twitter.com/widgets.js', 'twitter-widgets', () => {
        document.querySelectorAll('.tweet').forEach( (tweet) => {
          if( tweet.attributes['tweetid'] !== undefined ) {
            const tweetid = tweet.attributes['tweetid'].value;
            $script('https://platform.twitter.com/widgets.js', () => {
              window.twttr.widgets.createTweet(`${tweetid}`, tweet, {theme: 'dark'})
            })
          }
        })
    
        document.querySelectorAll('.timeline').forEach( (timeline) => {
          if( timeline.attributes['account'] !== undefined ) {
            const account = timeline.attributes['account'].value;
            const width = timeline.attributes['width'].value;
            const height = timeline.attributes['height'].value;
            $script('https://platform.twitter.com/widgets.js', () => {
              window.twttr.widgets.createTimeline(
                { sourceType: 'profile', screenName: `${account}` }, timeline,
                { theme: 'dark', width: `${width}`, height: `${height}`})
            })
          }
        })
      })
    }, 500))

    applyTwitter()
  }, [location])

  return (
    <React.Fragment>
      <h1 style={{fontSize: '3em'}}>{text.split('\n')[0].replace(/^[#]{1,6} /, '')}</h1>
      <h5>last updated: {updated}</h5>
      <div style={{width: '100%', height: '24px', margin: '10px 0', overflowX: 'auto', textOverflowX: 'ellipsis', whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none', '&::WebkitScrollbar': {display: 'none'}}}>
        {tags.map( (tag, index) => (
          <Chip key={index} variant="outlined" size="small" label={tag} style={{margin: '0 2px'}}/>
        ))}
      </div>
      <Divider />
      <div
        dangerouslySetInnerHTML={{ __html: md.render( text.split('\n').slice(1).join('\n') ) }}
        className="markdown"
      />
    </React.Fragment>
  )
}