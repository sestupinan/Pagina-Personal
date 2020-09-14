console.log("Ya no acabe");
class Palabra {
  constructor(tp, tn, fp, fn) {
    this.tp = tp;
    this.tn = tn;
    this.fp = fp;
    this.fn = fn;
  }
}

let promesa = new Promise((resolve, reject) => {
  let req = new XMLHttpRequest();
  let url =
    "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
  req.open("GET", url);
  req.onload = function () {
    if (req.status == 200) {
      //Existoso
      resolve(req.response);
    } else {
      //Error
      console.log("Error con la petición");
      reject("Error");
    }
  };
  req.send();
});

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
  
  

promesa.then((data) => {
  let data1 = JSON.parse(data);
  let table = document.querySelector("table");
  let data2 = Object.keys(data1[0]);
  generateTableHead(table, data2);
  generateTable(table, data1);
  let palabras = [];
  let infoPalabras = [];
  for (let index = 0; index < data1.length; index++) {
    let obj = data1[index];
    let palabrasi = obj.events;
    let squirrel = obj.squirrel;
    for (let index = 0; index < palabrasi.length; index++) {
      if (palabras.includes(palabrasi[index]) === false) {
        let nuevaInfo = new Palabra(0, 0, 0, 0);

        infoPalabras.push(nuevaInfo);
        palabras.push(palabrasi[index]);
        console.log(palabrasi[index]);
      } else {
      }
    }
  }
  console.log(palabras);
});



let r = new Palabra(0, 0, 0, 0);
