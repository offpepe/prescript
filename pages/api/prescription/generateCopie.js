import pdfJS from "pdfjs";
import fs from "fs";

const generateCopies = async (req, res) => {
  try {     
    const src = req.body;
    console.log(src);
    // const resStream = await src.getRead().read();
    const doc = new pdfJS.Document({
      height: 700,
      width: 1050,
      padding: 0,
    });
    const image = new pdfJS.Image(src); 
    // doc.pipe(fs.createWriteStream("./public/generated/prescriptionCopie.pdf"));
    const body = doc.table({ widths: [0, 0] }).row();
    body.cell().image(image);  
    body.cell().image(image);

    const output = await doc.asBuffer();
    const response = new Blob([output], { type: 'application/pdf' });
      res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .json({ err: { code: "internal_erorr", message: error.message } });
  }
};

export default generateCopies;
