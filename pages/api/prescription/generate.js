import pdfJS from 'pdfjs';
import fs from 'fs';
import font from 'pdfjs/font/Helvetica';
import bold from 'pdfjs/font/Helvetica-Bold';

const generatePDF = async (_req, res) => {
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
    header.cell().image(secIMG,{ width: 90 });
    //   .add('https://github.com/rkusa/pdfjs', {
    //     link: 'https://github.com/rkusa/pdfjs',
    //     color: 0x569cd6
    //   });
    doc.footer()
       .pageNumber(function(curr, total) { return curr + ' / ' + total }, { textAlign: 'center' });
    
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

    const addRecipe = (name, qtd, usage, apparence, obs) => {
      const recipeCard = doc.table({ widths: [250, 0, 0], paddingLeft: 30 });
      const recipeCardHeader = recipeCard.header()
      recipeCardHeader.cell({ alignment: 'right'}).text(`${name} ${ apparence && apparence }`, { textAlign: 'justify' });
      recipeCardHeader.cell({ alignment: 'center'}).text('', { textAlign: 'justify' });
      recipeCardHeader.cell({ alignment: 'left'}).text(qtd, { textAlign: 'justify' });
      const recipeCardBody = doc.table({ widths: [500], paddingLeft: 30, paddingTop: 2 }).row();
      recipeCardBody.cell({ alignment: 'center' }).text(`USO: ${usage}`, { textAlign: 'justify' });
      recipeCardBody.cell({ alignment: 'center' }).text(`USO: ${usage}`, { textAlign: 'justify' });
      (obs && recipeCardBody.cell({ alignment: 'center' }).text(obs, { textAlign: 'justify' }));
      
    }

    addRecipe('HIDROXIDO DE MAGNÉSIO', '1 FRASCO', 'INGERIR, POR VIA ORAL, 10ML DA SUBSTÂNCIA UMA HORA APÓS ALIMENTAÇÃO SE DOR EM QUEIMAÇÃO', '8MG');
    // cell.text({ fontSize: 14, lineHeight: 1.35 })
    //   .add('-')
    //   .add('different', { color: 0xf8dc3f })
    //   .add('font', { font })
    //   .add('styling', { underline: true })
    //   .add('options', { fontSize: 9 })
    //   cell.text('- Images (JPEGs, other PDFs)')
    // cell.text('- Tables (fixed layout, header row)')
    // cell.text('- AFM fonts and')
    // cell.text('- OTF font embedding (as CID fonts, i.e., support for fonts with large character sets)', {
    //   font,
    // })
    // cell.text('- Add existing PDFs (merge them or add them as page templates)')
    
    // doc.cell({ paddingBottom: 0.5 }).text()
    //   .add('For more information visit the')
    //   .add('Documentation', {
    //     link: 'https://github.com/rkusa/pdfjs/tree/master/docs',
    //     underline: true,
    //     color: 0x569cd6
    //   })
    
    // const table = doc.table({
    //   widths: [1.5, 1.5, null, 2, 2.5],
    //   borderHorizontalWidths: function(i) { return i < 2 ? 1 : 0.1 },
    //   padding: 5
    // })
    
    // const tr = table.header({ font, borderBottomWidth: 1.5 })
    // tr.cell('#')
    // tr.cell('Unit')
    // tr.cell('Subject')
    // tr.cell('Price', { textAlign: 'right' })
    // tr.cell('Total', { textAlign: 'right' })
    
    // function addRow(qty, name, desc, price) {
    //   const tr = table.row()
    //   tr.cell(qty.toString())
    //   tr.cell('pc.')
    
    //   const article = tr.cell().text()
    //   article.add(name, { font })
    //          .br()
    //          .add(desc, { fontSize: 11, textAlign: 'justify' })
    
    //   tr.cell(price.toFixed(2) + ' €', { textAlign: 'right' })
    //   tr.cell((price * qty).toFixed(2) + ' €', { textAlign: 'right' })
    // }
    
    // addRow(2, 'Article A', 'lorem ipsum', 500)
    // addRow(1, 'Article B', 'lorem ipsum', 250)
    // addRow(2, 'Article C', 'lorem ipsum', 330)
    // addRow(3, 'Article D', 'lorem ipsum', 1220)
    // addRow(2, 'Article E', 'lorem ipsum', 120)
    // addRow(5, 'Article F', 'lorem ipsum', 50)
    await doc.end();
    res.status(200).json('done')
}

export default generatePDF;