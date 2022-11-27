const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('tiny'));

//---- ROOT ----
app.get('/', (req, res) => {
  fs.readdir('data', "utf-8", (error, files)=>{
    if (error) {
      res.send(error.message);
      console.log(error.message)
    } else {
      let links = '';
      files.forEach(file => {
        if (file!="README.md") {
          links += `
          <li>
            <a href="http://localhost:${port}/${file}"> ${file}</a>
          </li>
          `;
        }
      })
      res.send(`
      <ul>
        ${links}
      </ul>
      `);
    }
  });
});

//---- DATA DIR ----
app.get('/:name', (req, res) => {
  const name = req.params.name;
  fs.readdir(`data/${name}`, "utf-8", (error, files)=>{
    if (error) {
      res.send(error.message);
      console.log(error.message)
    } else {
      let links = '';
      files.forEach(file => {
        links += `
          <li>
            <a href="http://localhost:${port}/${name}/${file}"> ${file}</a>
          </li>
          `;
      })
      res.send(`
      <ul>
        ${links}
      </ul>
      `);
    }
  });
});

//---- JSON DENTRO DE DIR ----
app.get('/:name/:id', (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  const ruta = `./data/${name}/${id}`
  fs.readFile(ruta, (error, data) =>{
    if (error) {
      res.send(error.message);
    } else {
      res.json(JSON.parse(data.toString()));
    }
  });
});


app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
});