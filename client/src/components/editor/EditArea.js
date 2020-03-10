import React from 'react';
import axios from 'axios';

import { store } from '../../store';
import { changeText, 
  saveDocumentRequest, saveDocumentSuccess, saveDocumentFailed, 
  openSaveDocumentNotification, closeSaveDocumentNotification,
} from '../../actions/actions';

const style = {
  overflowY: 'auto',
  margin: '0% 2% 2%',
  padding: '2% 2% 0',
  border: 'none',
  width: '96%',
  height: '98%',
  resize: 'none',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  color: '#ffffff',
  backgroundColor: '#424242'
}

export default function EditArea() {
  const inputRef = React.useRef();

  const { path, text, tags } = store.getState().document
  const { isSaving } = store.getState().editor.save
  
  const handleSaveDocument = async() => {
    if( !isSaving ) {
      store.dispatch( saveDocumentRequest() )
      await axios.put('/api/document', {
        path: path.current,
        diff: {
          text: text,
          tags: tags,
        }
      })
      .then( (res) => {
        store.dispatch( saveDocumentSuccess() );
      })
      .catch( (err) => {
        store.dispatch( saveDocumentFailed() );
      })
      await store.dispatch( openSaveDocumentNotification() )
      await new Promise(() => setTimeout(() => store.dispatch( closeSaveDocumentNotification() ), 2*1000));
    }
  }

  const handleCommand = (e) => {
    if(e.key === 's' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSaveDocument();
    }else{
      new Promise( (resolve, reject) => {
        const prevCursor = [inputRef.current.selectionStart, inputRef.current.selectionEnd]
        resolve( getCommandBehavior(e, prevCursor, text) );
      })
      .then( function( result ) {
        const { cursor, newText } = result
        store.dispatch( changeText( newText ) )
        return cursor;
      })
      .then( function( cursor ) {
        [inputRef.current.selectionStart, inputRef.current.selectionEnd] = cursor;
      })
    }
  }

  return (
      <textarea
        style={style}
        type="text"
        id="editor"
        label="editor"
        ref={inputRef}
        autoFocus={true}
        value={text}
        onChange={(e) => store.dispatch( changeText( e.target.value ) )}
        onKeyDown={(e) => handleCommand(e)}
      />
  )
}

const commands = {
  ctrl: { b: '**', i: '*', u: '++', m: '==' },
  alt: { 77: '$$', 67: '```' },
}

function getCommandBehavior( e, prevCursor, text ) {
  if( e.key === 'Tab' ) {
    e.preventDefault()
    return {
      cursor: [ prevCursor[0]+4, prevCursor[1]+4 ],
      newText: text.substring(0, prevCursor[0]) + '    ' + text.substring(prevCursor[1]), 
    }
  }
  if( e.ctrlKey || e.metaKey ) {
    if( ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
      e.preventDefault();
      const nextHeaddingLength = e.key - '1' + 1;
      const splited = text.substring(0, prevCursor[0]).split('\n');
      const prevHeadding = splited[splited.length-1].match(/^[#]+ /g)
      const prevHeaddingLength = prevHeadding === null ? 0 : prevHeadding[0].length;
      const newText = [ ...splited.slice(0, -1),
                        '#'.repeat(nextHeaddingLength)+' '+splited[splited.length-1].slice(prevHeaddingLength)].join('\n')
                         + text.substring(prevCursor[1])
      const diffCursor = (nextHeaddingLength+1) - prevHeaddingLength;
      return {
        cursor: [ prevCursor[0]+diffCursor, prevCursor[1]+diffCursor ],
        newText: newText,
      }
    }
    if( commands.ctrl[e.key] !== undefined ) {
      e.preventDefault();
      const marker = commands.ctrl[e.key];
      return {
        cursor: [ prevCursor[0]+marker.length, prevCursor[1]+marker.length ],
        newText: text.substring(0, prevCursor[0]) + marker + text.substring(prevCursor[0], prevCursor[1]) + marker + text.substring(prevCursor[1])
      }
    }
  }

  if( e.altKey && !e.shiftKey ) {
    if( commands.alt[e.keyCode] !== undefined ) {
      e.preventDefault();
      const marker = commands.alt[e.keyCode];
      return {
        cursor: [ prevCursor[0]+marker.length, prevCursor[1]+marker.length ],
        newText: text.substring(0, prevCursor[0]) + marker + '\n' + text.substring(prevCursor[0], prevCursor[1]) + '\n' + marker + text.substring(prevCursor[1])
      }
    }
  }

  if( e.altKey && e.shiftKey ) {
    if( commands.alt[e.keyCode] !== undefined ) {
      e.preventDefault();
      const marker = commands.alt[e.keyCode][0];
      return {
        cursor: [ prevCursor[0]+1, prevCursor[1]+1 ],
        newText: text.substring(0, prevCursor[0]) + marker + text.substring(prevCursor[0], prevCursor[1]) + marker + text.substring(prevCursor[1])
      }
    }
  }


  return {
    cursor: prevCursor,
    newText: text,
  }
}


// if(e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey){
//   // Undo
//   e.preventDefault();
//   if( undoStack.length > 0 ){
//     new Promise( (resolve, reject) => {
//       resolve( setRawDocument( undoStack[0] ) )
//     }).then((resolve, reject) => {
//       setRedoStack( [ rawDocument, ...redoStack ] )
//       setUndoStack( [ ...undoStack.slice(1) ] )
//     })
//   }
// }
// if((e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) || (e.key === 'y' && (e.ctrlKey || e.metaKey))){
//   // Redo
//   e.preventDefault();
//   if( redoStack.length > 0 ){
//     new Promise( (resolve, reject) => {
//       resolve( setRawDocument( redoStack[0] ) )
//     }).then(() => {
//       setUndoStack( [ rawDocument, ...undoStack ] )
//       setRedoStack( [ ...redoStack.slice(1) ] )
//     })
//   }
// }