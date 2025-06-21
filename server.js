// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const CONTENT_FILE = path.join(__dirname, 'content.txt');

const app = express();

app.use(express.static(path.join(__dirname))); 
app.use(cors());
app.use(express.text({ type: '*/*' }));

app.get('/content', (req, res) =>
  fs.readFile(CONTENT_FILE, 'utf8', (err, data) =>
    res.send(err ? '' : data)
  )
);

app.post('/content', (req, res) =>
  fs.writeFile(CONTENT_FILE, req.body, 'utf8', err =>
    res.status(err ? 500 : 200).end()
  )
);

app.listen(3000, () =>
  console.log('▶ API server running at http://localhost:3000')
);
