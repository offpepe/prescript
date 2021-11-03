import fs from 'fs/promises';

export default async function getPrescription (_req, res) {
    try {
    const pdf = await fs.readFile('./prescription.pdf');
    res.status(200).send(pdf);
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}