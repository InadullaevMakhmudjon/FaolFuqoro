const cors = require('cors');
const express = require('express');
const {json,urlencoded} = require('express');
const { createServer } = require('http');
const fileUpload = require('express-fileupload');
const application = require('./routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use('/files', express.static('files'));

app.get('/message', (req, res) => res.status(200).json({ message: 'test' }));

app.use('/api/', application);

const server = createServer(app);

const port = process.env.PORT || 3030;

server.listen(port);
server.on('listening', () => console.log(`Listening on ${port}`));
