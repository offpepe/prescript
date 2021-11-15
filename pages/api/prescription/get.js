import fs from "fs";

export default async function getPrescription(_req, res) {
  try {
    const pdf = fs.createReadStream("./public/prescription.pdf");
    res.status(200).send(pdf);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
