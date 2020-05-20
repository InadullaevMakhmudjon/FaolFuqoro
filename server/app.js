const twilio = require('twilio');
const cors = require('cors');
const express = require('express');
const { createServer } = require('http');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const service = client.verify.services(process.env.TWILIO_SERVICE_ID);
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/message', (req, res) => res.status(200).json({ message: 'test' }));

app.post('/api/send', (req, res) => {
  console.log(`Come...${req.query.phone}`);
  if (req.query.phone) {
    service.verifications.create({
      to: `+${req.query.phone}`,
      channel: 'sms',
    }).then(() => res.sendStatus(200))
      .catch((err) => res.status(502).json(err));
  } else res.sendStatus(403);
});

app.post('/api/check', (req, res) => {
  const { phone, code } = req.query;
  if (phone && code) {
    service.verificationChecks.create({
      to: `+${phone}`,
      code,
    }).then(({ valid }) => {
      if (valid) res.status(200).json({ message: 'Successfully confirmed' });
      else res.status(401).json({ message: 'Code is not confirmed' });
    });
  }
});

const server = createServer(app);

server.listen(process.env.PORT || 3030);
server.on('listening', () => console.log('Listening...'));
