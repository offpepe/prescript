
// available variables: pdf, fonts, logo, lorem

var doc = new pdf.Document({ font: fonts.Helvetica })

var header = doc.header().table({ widths: [null, null], paddingBottom: 1*pdf.cm }).row()
header.cell().image(logo, { height: 2*pdf.cm })
header.cell().text({ textAlign: 'right' })
  .add('A Portable Document Format (PDF) generation library targeting both the server- and client-side.')
  .add('https://github.com/rkusa/pdfjs', {
    link: 'https://github.com/rkusa/pdfjs',
    underline: true,
    color: 0x569cd6
  })

doc.footer()
   .pageNumber(function(curr, total) { return curr + ' / ' + total }, { textAlign: 'center' })

var cell = doc.cell({ paddingBottom: 0.5*pdf.cm })
cell.text('Features:', { fontSize: 16, font: fonts.HelveticaBold })
cell.text({ fontSize: 14, lineHeight: 1.35 })
  .add('-')
  .add('different', { color: 0xf8dc3f })
  .add('font', { font: fonts.TimesRoman })
  .add('styling', { underline: true })
  .add('options', { fontSize: 9 })
  cell.text('- Images (JPEGs, other PDFs)')
cell.text('- Tables (fixed layout, header row)')
cell.text('- AFM fonts and')
cell.text('- OTF font embedding (as CID fonts, i.e., support for fonts with large character sets)', {
  font: fonts.OpenSans
})
cell.text('- Add existing PDFs (merge them or add them as page templates)')

doc.cell({ paddingBottom: 0.5*pdf.cm }).text()
  .add('For more information visit the')
  .add('Documentation', {
    link: 'https://github.com/rkusa/pdfjs/tree/master/docs',
    underline: true,
    color: 0x569cd6
  })

var table = doc.table({
  widths: [1.5*pdf.cm, 1.5*pdf.cm, null, 2*pdf.cm, 2.5*pdf.cm],
  borderHorizontalWidths: function(i) { return i < 2 ? 1 : 0.1 },
  padding: 5
})

var tr = table.header({ font: fonts.HelveticaBold, borderBottomWidth: 1.5 })
tr.cell('#')
tr.cell('Unit')
tr.cell('Subject')
tr.cell('Price', { textAlign: 'right' })
tr.cell('Total', { textAlign: 'right' })

function addRow(qty, name, desc, price) {
  var tr = table.row()
  tr.cell(qty.toString())
  tr.cell('pc.')

  var article = tr.cell().text()
  article.add(name, { font: fonts.HelveticaBold })
         .br()
         .add(desc, { fontSize: 11, textAlign: 'justify' })

  tr.cell(price.toFixed(2) + ' €', { textAlign: 'right' })
  tr.cell((price * qty).toFixed(2) + ' €', { textAlign: 'right' })
}

addRow(2, 'Article A', lorem, 500)
addRow(1, 'Article B', lorem, 250)
addRow(2, 'Article C', lorem, 330)
addRow(3, 'Article D', lorem, 1220)
addRow(2, 'Article E', lorem, 120)
addRow(5, 'Article F', lorem, 50)

