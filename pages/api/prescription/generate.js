import pdfJS from 'pdfjs';
import fs from 'fs';
import font from 'pdfjs/font/Helvetica';
import bold from 'pdfjs/font/Helvetica-Bold';
import boldItalic from 'pdfjs/font/Times-BoldItalic';
import timesBold from 'pdfjs/font/Times-Bold';

const recipesMOCK = [
  {
    name: 'HIDROXIDO DE MAGNÉSIO',
    qtd: '1 FRASCO',
    apparence: '',
    usage: 'INGERIR, POR VIA ORAL, 10ML DA SUBSTÂNCIA UMA HORA APÓS ALIMENTAÇÃO SE DOR EM QUEIMAÇÃO',
    obs:'USAR NO MÁXIMO 4 VEZES AO DIA POR 14 DIAS'
  },
  {
    name: 'OMEPRAZOL',
    qtd: '28 COMPRIMIDOS',
    apparence: '20MG',
    usage: 'INGERIR UM COMPRIMIDO, POR VIA ORAL PELA MANHÃ, ANTES DO CAFÉ DA MANHÃ',
    obs: ''
  },
  {
    name: 'SIMETICONA',
    qtd: '1 FRASCO',
    apparence: '75MG/ML',
    usage: 'INGERIR 15 GOTAS DE 6/6H POR VIA ORAL SE DESCONFORTO ABDOMINAL',
    obs: ''
  },
]

const generatePDF = async (_req, res) => {
  try {
  const headerIMG = new pdfJS.Image(fs.readFileSync('./static/brasão.jpg'));
  const secIMG = new pdfJS.Image(fs.readFileSync('./static/secIcon.jpeg'));
  const recipeSymbol = new pdfJS.Image(fs.readFileSync('./static/Rx_symbol.jpg'));
    const doc = new pdfJS.Document({
        font,
        padding: 10,
    });
    
    doc.pipe(fs.createWriteStream('prescription.pdf'));
    const header = doc.header().table({ widths: [90, 300, 90], paddingTop: 30, paddingLeft: 30 }).row({ alignment: 'center' });
    header.cell().image(headerIMG, { width: 90 });
    header.cell().text({ textAlign: 'center' })
    .add('Prefeitura Municipal de Água Fria', { textAlign: 'center' ,fontSize: 14, font: bold }).br()
    .add('SECRETARIA MUNICIPAL DE SAÚDE', { textAlign: 'center' ,fontSize: 12, font }).br()
      .add('Rua Ruy Barbosa, 40 - Centro - CEP - 48170-000 - Água Fria - BA', { textAlign: 'center' ,fontSize: 9, font }).br()
      .add('CNPJ: 13.900.292/0001-60', { textAlign: 'center' ,fontSize: 9, font: bold }).br();
      header.cell({ paddingLeft: 0 }).image(secIMG,{ width: 90 });
      doc.footer().text('Voltando a consulta, fineza trazer esta Receita', { 
        textAlign: 'center',
        font: boldItalic,
        fontSize: 14,
      });
      

    const body = doc.table({ widths: [90, null]}).row();
    body.cell().image(recipeSymbol, { width: 90 });
    body.cell({ 
      alignment: 'center',
      font,
      fontSize: 15,
      lineHeight: 1.3,
      paddingLeft: 30,
      paddingTop: 115,
    }).text('PARA: \n INSERT NAME HERE');


    const addRecipe = (name, qtd, apparence, usage, obs) => {
      const recipeCard = doc.table({ widths: [215, 150, null], paddingLeft: 30, paddingTop: 20, fontSize: 14 });
      const recipeCardHeader = recipeCard.header()
      recipeCardHeader.cell().text(`${name} ${ apparence && apparence }`);
      recipeCardHeader.cell().text('-------------------------', { textAlign: 'justify' });
      recipeCardHeader.cell().text(qtd, { textAlign: 'left' });
      const recipeCardBody = doc.table({ widths: [500], paddingLeft: 30, paddingTop: 2, fontSize: 14 }).row();
      recipeCardBody.cell().text(`USO: ${usage}`, { textAlign: 'justify' }).br().br()
      .add((obs ? obs : ''), { font: bold });
      
    }

    recipesMOCK.map(({ name, qtd, apparence, usage, obs }) => addRecipe(name, qtd, apparence, usage, obs));

    const signatureAndDate = doc.table({ widths: [null, null], paddingLeft: 30, paddingTop: 60 }).row();
    const date = new Date().toLocaleDateString('pt-BR')

    signatureAndDate.cell({ textAlign: 'center', font: timesBold, fontSize: 15 }).text('___________________', { textAlign: 'center' }).br()
    .add('FILIPE LOPES').br()
    .add('MÉDICO GENERALISTA').br()
    .add('CRM/BA 37825');

    signatureAndDate.cell().text({ textAlign: 'center', font: timesBold, fontSize: 15 }).add(`    ${date}    `, { underline: true }).br()
    .add('DATA', { underline: false });

    const output = await doc.asBuffer()
    res.status(200).json(output)
    await doc.end();
  } catch (err) { 
    res.status(500).json({ err: { code: 'internal_error', message: err.message  } });
  }
}

export default generatePDF;