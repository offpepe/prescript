import { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

export default function PrescriptionView ({ document }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  return (
    <Document
    file='./api/prescription/get'
    onLoadError={ (err) => console.log(err)}
  >
  <Page pageNumber={ 1 } height={ 1000 } onRenderSuccess={ () => window.print() } />
  </Document>
  );
}