const axios = require("axios");
const http = require("http");
const url = require("URL");
const fs = require("file-system");
const htmlp = require("node-html-parser");
let test;
let proveedores = [];
let clientes=[];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function promesa() {
    test = axios
    .get(
      "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
    ).then((data) => {
        //let data1 = JSON.parse(data);
        proveedores=data;
        console.log(proveedores);
        console.log("Success en la petición 1");
      })
      .catch((data) => {
        console.log("Error en petición 1");
      });
    console.log(test);
    console.log(proveedores);

    return test;
    
}

function promesa2() {
  return axios
    .get(
      "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
    )
    .then((data) => {
      console.log("Success en la petición 2");
    })
    .catch((data) => {
      console.log("Error en petición 2");
    });
}


http
  .createServer(async function (req, res) {
    var q = url.parse(req.url, true);
    var status = "";
    var name = "";
    if (q.pathname == "/api/proveedores") {
      name = q.query["name"] + ":";
      await promesa();
      console.log("este es proveedores" + proveedores);
      fs.readFile("./index.html", function (err, data) {
        if (err) {
          throw err;
        }
        let doc = htmlp.parse(data);
        let table = doc
          .querySelector("body")
          .querySelector("table")
          .querySelector("tbody");
          proveedores.forEach((element) => {
            table.insertAdjacentHTML(
              "beforebegin",
              "<tr><td>" +
                element.idproveedor +
                "</td><td>" +
                element.nombrecompania +
                "</td><td>" +
                element.nombrecontacto +
                "</td></tr>"
            );
          });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.write(status);
        return res.end();
      });

    } else if (q.pathname == "/api/clientes") {
      name = q.query["name"] + ":";
      proveedores = await promesa2();
      console.log(proveedores);
      fs.readFile("./index2.html", function (err, data) {
        if (err) {
            throw err;
          }
          let doc = htmlp.parse(data);
          let table = doc
            .querySelector("body")
            .querySelector("table")
            .querySelector("tbody");
            proveedores.forEach((element) => {
              table.insertAdjacentHTML(
                "beforebegin",
                "<tr><td>" +
                  element.idCliente +
                  "</td><td>" +
                  element.NombreCompania +
                  "</td><td>" +
                  element.NombreContacto +
                  "</td></tr>"
              );
            });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.write(status);
        return res.end();
      });
    }
  })
  .listen(8081);
