import pdfJS from "pdfjs";
import fs from "fs";
import { Readable } from "stream";
import { resolve } from "path";

const generateCopies = async (req, res) => {
  try {    
    const src = fs.readFileSync('./public/prescription.pdf');
    const doc = new pdfJS.Document({
      height: 700,
      width: 1050,
      padding: 0,
    });
    const image = new pdfJS.Image(src);
    const body = doc.table({ widths: [0, 0] }).row();
    body.cell().image(image);
    body.cell().image(image);
    const output = await doc.asBuffer();
    fs.writeFileSync('./public/prescription.pdf', output);
    res.status(200).json(output);
  } catch (error) {
    res
      .status(500)
      .json({ err: { code: "internal_erorr", message: error.message } });
  }
};

export default generateCopies;
