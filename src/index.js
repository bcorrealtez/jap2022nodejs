const express = require('express')
const app = express()
const port = 3000

app.get('/:name/:id', (req, res) => {
  const name = req.params.name;
  const id = req.params.id;
  console.log(name);
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})