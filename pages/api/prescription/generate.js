import pdfJS from "pdfjs";
import fs from "fs";

const generatePDF = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const { fullname, medications } = data;
    const roboto = new pdfJS.Font(
      fs.readFileSync("./public/fonts/Roboto-Regular.ttf")
    );
    const robotoBold = new pdfJS.Font(
      fs.readFileSync("./public/fonts/Roboto-Bold.ttf")
    );
    const robotoItalicBold = new pdfJS.Font(
      fs.readFileSync("./public/fonts/Roboto-BoldItalic.ttf")
    );
    const droidMono = new pdfJS.Font(
      fs.readFileSync("./public/fonts/droid-sans-mono.regular.ttf")
    );
    const headerIMG = new pdfJS.Image(fs.readFileSync("./public/brasao.jpg"));
    const secIMG = new pdfJS.Image(fs.readFileSync("./public/secIcon.jpeg"));
    const recipeSymbol = new pdfJS.Image(
      fs.readFileSync("./public/Rx_symbol.jpg")
    );
    const doc = new pdfJS.Document({
      font: roboto,
      author: "Filipe Lopes",
      padding: 12,
    });

    const header = doc
      .header()
      .table({ widths: [90, 300, 90], paddingTop: 30, paddingLeft: 50 })
      .row({ alignment: "center" });
    header.cell().image(headerIMG, { width: 90 });
    header
      .cell()
      .text({ textAlign: "center" })
      .add("Prefeitura Municipal de Água Fria", {
        textAlign: "center",
        fontSize: 14,
        font: robotoBold,
      })
      .br()
      .add("SECRETARIA MUNICIPAL DE SAÚDE", {
        textAlign: "center",
        fontSize: 12,
        font: roboto,
      })
      .br()
      .add("Rua Ruy Barbosa, 40 - Centro - CEP - 48170-000 - Água Fria - BA", {
        textAlign: "center",
        fontSize: 9,
        font: roboto,
      })
      .br()
      .add("CNPJ: 13.900.292/0001-60", {
        textAlign: "center",
        fontSize: 9,
        font: robotoBold,
      })
      .br();
    header.cell({ paddingLeft: 0 }).image(secIMG, { width: 90 });
    doc.footer().text("Voltando a consulta, fineza trazer esta Receita", {
      textAlign: "center",
      font: robotoItalicBold,
      fontSize: 14,
    });

    const body = doc.table({ widths: [90, null], paddingTop: 40 }).row();
    body.cell().image(recipeSymbol, { width: 90 });
    body
      .cell({
        alignment: "center",
        font: roboto,
        fontSize: 15,
        lineHeight: 1.3,
        paddingLeft: 30,
        paddingTop: 145,
      })
      .text(`PARA: \n ${fullname}`);

    const generateDots = (value, postDots) => {
      let max = 55;
      let firstField = value;
      let numDots = 0;
      let dots = "";
      if (value > max) {
        max += 2;
        firstField = value - max;
      }
      numDots = max - (firstField + postDots);
      for (let index = 0; index <= numDots; index += 1) {
        dots += ".";
      }
      return dots;
    };

    const addRecipe = (name, qtd, apparence, usage, obs) => {
      const recipeCard = doc.table({
        widths: [595.296],
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 20,
        fontSize: 14,
        font: droidMono,
      });
      const dots = generateDots(name.length + apparence.length, qtd.length);
      const recipeCardHeader = recipeCard.header();
      recipeCardHeader
        .cell()
        .text(`${name} ${apparence && apparence} ${dots} ${qtd}`, {
          alignment: "left",
          textAlign: "justify",
        });
      const recipeCardBody = doc
        .table({
          widths: [500],
          paddingLeft: 30,
          paddingTop: 2,
          fontSize: 14,
          font: droidMono,
        })
        .row();
      recipeCardBody
        .cell()
        .text({ textAlign: "justify" })
        .add(`USO: ${usage}`)
        .br()
        .br()
        .add(obs ? obs : "", { font: roboto });
    };

    medications.map(({ name, qtd, appearance, usage, obs }) =>
      addRecipe(name, qtd, appearance, usage, obs)
    );

    const signatureAndDate = doc
      .table({ widths: [null, null], paddingLeft: 30, paddingTop: 60 })
      .row();
    const date = new Date().toLocaleDateString("pt-BR");

    signatureAndDate
      .cell({ textAlign: "center", font: robotoBold, fontSize: 15 })
      .text({ textAlign: "center", lineHeight: 0.8 })
      .add("                                               ", {
        underline: true,
      })
      .br()
      .add("FILIPE LOPES")
      .br()
      .add("MÉDICO GENERALISTA")
      .br()
      .add("CRM/BA 37825");

    signatureAndDate
      .cell()
      .text({ textAlign: "center", font: robotoBold, fontSize: 15 })
      .add(`        ${date}       `, { underline: true })
      .br()
      .add("DATA", { underline: false });

    const output = await doc.asBuffer();
    // fs.writeFileSync('./public/generated/prescription.pdf', output);
    return res.status(200).send(output);
  } catch (err) {
    const message = { err: { code: "internal_error", message: err.message } };
    console.log(message);
    res.status(500).send(message);
  }
};

export default generatePDF;
