// import '../../styles/markdown.css';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import container from 'markdown-it-container';
import customBlock from 'markdown-it-custom-block';


const useMd = ( isEditing ) => { 
  const md =  new MarkdownIt({
    highlight: function(code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
    html: true,
    linkify: true,
    typographer: true
  })
  .use(require('markdown-it-sanitizer'))
  .use(require('markdown-it-anchor').default)
  .use(require('markdown-it-header-sections'))
  .use(require('markdown-it-imsize'), { autofill: true })
  .use(require('markdown-it-video'))
  .use(require("@iktakahiro/markdown-it-katex"), {
    throwOnError: false,
    errorColor: " #cc0000",
  })
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-checkbox'), {
    divWrap: true,
    divClass: 'checkbox',
    idPrefix: 'checkbox_'
  })
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-footnote'))
  .use(customBlock, {
    example (arg) {
      return `<example-${arg}/>`
    },
    video (url) {
      return `<video controls>
        <source src="${url}" type="video/mp4">
      </video>`
    },
    youtube (url) {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = url.match(regExp);
      const url_ = match && match[7].length===11 ? match[7] : url;
      if( isEditing ) return `<div class="embed-responsive-16by9">YouTube Video at <a href=https://www.youtube.com/watch?v=${url_}>https://www.youtube.com/watch?v=${url_}</div>\n`
      return `<div class="embed-responsive-16by9"><iframe class="embed-responsive-item youtube-player" type="text/html" src="https://www.youtube.com/embed/${url_}" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="640" height="390" frameborder="0"></iframe></div>\n`
    },
    tweets (id) {
      if( isEditing ) return `<div class="tweet tweet-s" tweetid=${id}><div class="twitter-editing">tweet id: ${id}</div></div>\n`
      return `<div class="tweet tweet-s" tweetid=${id} ></div>\n`
    },
    tweetm (id) {
      if( isEditing ) return `<div class="tweet" tweetid=${id}><div class="twitter-editing">tweet id: ${id}</div></div>\n`
      return `<div class="tweet tweet-m" tweetid=${id} ></div>\n`
    },
    tweetl (id) {
      if( isEditing ) return `<div class="tweet tweet-l" tweetid=${id}><div class="twitter-editing">tweet id: ${id}</div></div>\n`
      return `<div class="tweet tweet-l" tweetid=${id} ></div>\n`
    },
    timeline (account) {
      if( isEditing ) return `<div class='timeline' account=${account} width='450' height='600'><div class="twitter-editing">Tweet by<a href=https://twitter.com/${account}>@${account}</a></div></div>\n`
      return `<div class='timeline' account=${account}  width='450' height='600'></div>\n`
    }
  })
  .use(container, 'box', {
    validate: function(params) {
      return params.trim().match(/^box\s+(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^box\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<div class='box' title=${md.utils.escapeHtml(m[1])}>\n`;
      } else {
        return '</div>\n';
      }
    }
  })
  .use(container, 'details', {
    validate: function(params) {
      return params.trim().match(/^details\s+(.*)$/);
    },
    render: function (tokens, idx) {
      var m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
      if (tokens[idx].nesting === 1) {
        return `<details ${isEditing && 'open'}><summary>${md.utils.escapeHtml(m[1])}</summary>\n`;
      } else {
        return '</details>\n';
      }
    }
  });

  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }
  
  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')
    if (tokens[idx]['attrs'][0][1].match('http')) {
      if (aIndex < 0 ) {
        tokens[idx].attrPush(['target', '_blank'])
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  }
  
  return md;
}


export default useMd;