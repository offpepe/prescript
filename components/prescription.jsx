  import style from "../styles/Home.module.css";
  import crypto from "crypto";
  import Link from "next/link";
  import { Modal, Spinner } from "react-bootstrap";
  import { Document, pdfjs, Page } from "react-pdf";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faFileDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

  export default function Prescription({ show, setShow, copie, fullName, pdf: pdfProp }) {
    const [pdfLink, setPdfLink] = useState('')
    useEffect(() => {
      const gC = async () => {
        const bufferPdf =  await new Blob([pdfProp.buffer], { type: 'image/png' }).text();
        const formFile = new FormData();
        formFile.append('file', bufferPdf);
        await fetch('/api/prescription/generateCopie', {
          method: 'POST',
          body: bufferPdf,
        });
        setPdfLink('/api/prescription/get'); 
      }
      if(copie) {
        gC();
      } else {
        setPdfLink(URL.createObjectURL(new Blob([pdfProp.buffer], { type: 'application/pdf' })));
      }
    }, [copie, pdfProp]);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const fName = fullName.split(" ").join("_");
    const date = new Date().toLocaleDateString("en-US");
    const hash = crypto.createHash("md5").update(fName).digest('hex');

    const pdf = copie
      ? '/api/prescription/generateCopie'
      : '/api/prescription/get';
    return (
      <>
        {show && (
          <Modal show={show}>
            <Modal.Header closeButton onHide={setShow}>
              <div className={style.prescriptionPreviewHeader}>
                <a
                  download={`Prescrição_${fName}_${date}_${hash}.pdf`}
                  href={ pdfLink }
                >
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
                <Link
                  href={
                    copie ? "/prescriptionView?copie=true" : "/prescriptionView"
                  }
                >
                  <a target="_blank" rel="noreferrer">
                    ​
                    <FontAwesomeIcon icon={faPrint} />
                  </a>
                </Link>
              </div>
            </Modal.Header>
            <Modal.Body className={style.prescriptionPreviewBody}>
              <Document
                file={ pdfProp.buffer}
                loading={ <Spinner animation="grow" /> }

              >
                <Page pageNumber={1} height={700} />
              </Document>
            </Modal.Body>
            <Modal.Footer className={style.prescriptionPreviewFooter}>
              <p>
                obs: a escala do documento está reduzida, para ver em escala real,
                baixe-o
              </p>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  } 
