import React, { useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';

function EditorPage() {
    const textToJson = (text) => {
      var cells = text.split('\n').map(function (el) { return el.split(/\s+/); });
      var headings = cells.shift();
      var out = cells.map(function (el) {
        var obj = {};
        for (var i = 0, l = el.length; i < l; i++) {
          obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
        }
        return obj;
      }); 
    };
    const initialText = 'The quick brown fox jumps over the lazy dog';
    const [text, setText] = useState(initialText);


      return (
        <>
           <Editor
              initialValue={textToJson(initialText)}
              outputFormat='text'
              onEditorChange={(newText) => setText(newText)}
            />
            <pre>{JSON.stringify(text,null,2)}</pre>
        </>
      );
    }
     export default EditorPage;





