import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Document, Page, pdfjs } from 'react-pdf';

export default function PrescriptionView () {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [copie, setCopie] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const { copie: cp } = router.query;
    setCopie(cp);   
  },[router])
  return (
    <Document
    file={ copie ?  './api/prescription/generateCopie' : './api/prescription/get' }
    onLoadError={ (err) => console.log(err)}
  >
  <Page pageNumber={ 1 } height={ 1000 } onRenderSuccess={ () => window.print() } />
  </Document>
  );
}