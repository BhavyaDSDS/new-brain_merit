import React from 'react';
import Pdf from "react-to-pdf";

const ref = React.createRef();

function PdfConverter() {
  return (
    <div>
    <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
    </Pdf>
         <div ref={ref}>
                <h1>Hello This is testing </h1>
                 <h2>This is one more test!</h2>
         </div>
    </div>
  )
}

export default PdfConverter 