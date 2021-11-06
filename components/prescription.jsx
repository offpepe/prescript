import crypto from 'crypto';
import { Modal } from 'react-bootstrap';
import { Document, pdfjs, Page } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

export default function Prescription ({ show, setShow, copie, fullName }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const fName = fullName.split(' ').join('_');
  const date = new Date().toLocaleDateString('en-US');
  const hash = crypto.createHash('md5').update(fName).digest('base64');
  const pdf = (copie ? "http://localhost:3000/api/prescription/generateCopie" : "http://localhost:3000/api/prescription/get");
    return (
      <>
      { show && (
        <Modal
          show={ show }
        >
        <Modal.Header closeButton onHide={ setShow }>
        <a
          download={`Prescrição_${fName}_${date}_${hash}.pdf`}
          href={ pdf }
          >
          <FontAwesomeIcon icon={ faFileDownload } />
        </a>
        <a href="" onClick={ (ev) => {
          ev.preventDefault();
          window.open('/prescriptionView', 'PRINT');
        } } >​​<FontAwesomeIcon icon={ faPrint   } /></a>
        </Modal.Header>
        <Modal.Body style={ { 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overfloX: 'hidden',
        } }>
        <Document
          file='/api/prescription/get'
          onLoadError={ (err) => console.log(err)}
          onLoadProgress={ () => console.log('loading') }
          onLoadSuccess={ () => console.log('it should works') }
        >
        <Page pageNumber={ 1 } height={ 700 } />
        </Document>    
        </Modal.Body>
        <Modal.Footer style={ 
          {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }
         } >
          <p style={ { 
            fontSize: '12px',
            fontStyle: 'italic',
           } } >
            obs: a escala do documento está reduzida, para ver em escala real, baixe-o
          </p>
        </Modal.Footer>
        </Modal>
      ) }
      </>
    )
}