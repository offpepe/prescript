import pdfJS from "pdfjs";
import fs from "fs";
import { Readable } from "stream";
import { resolve } from "path";

const generateCopies = async (req, res) => {
  try {    
    const src = new Buffer(req.body).buffer;
    fs.writeFileSync('./public/prescript.pdf', req.body);
    const doc = new pdfJS.Document({
      height: 700,
      width: 1050,
      padding: 0,
    });
    const image = new pdfJS.Image(fs.readFileSync('./public/prescript.pdf'));
    const body = doc.table({ widths: [0, 0] }).row();
    body.cell().image(image);
    body.cell().image(image);
    const output = await doc.asBuffer();
    res.status(200).json(output);
  } catch (error) {
    res
      .status(500)
      .json({ err: { code: "internal_erorr", message: error.message } });
  }
};

export default generateCopies;
