import React, { useRef } from 'react'
import JoditEditor from 'jodit-react'
import { Jodit } from 'jodit-react';

const config={
  readonly: false,
  toolbarAdaptive: false,
  buttons: [
      'bold', 'underline', 'italic', 'ul', 'ol','font','fontsize','indent','outdent','spellcheck','link'
  ]
}

function RichTextEditors(props) 
{
  const {setValue,value}=props;
  const editor = useRef(null)
  return (
    <div>
      <JoditEditor ref={editor}  onChange={(content) => setValue(content)} config={config} value={value} />
    </div>
  )
}

export default RichTextEditors