const router = require('express').Router();
const twilio = require('twilio');
require('dotenv').config();

const { BASE_URL, TWILIO_SID, TWILIO_TOKEN } = process.env;

const client = twilio(TWILIO_SID, TWILIO_TOKEN);
const service = client.verify.services(process.env.TWILIO_SERVICE_ID);

router.post('/send', (req, res) => {
  if (req.query.phone) {
    service.verifications.create({
      to: `+${req.query.phone}`,
      channel: 'sms',
    }).then(() => res.sendStatus(200))
      .catch((err) => res.status(502).json(err));
  } else res.sendStatus(403);
});

router.post('/check', (req, res) => {
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

router.post('/upload', (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const filename = `${(new Date().toISOString())}-${file.name}`;
    file.mv(`./files/${filename}`, (error) => {
      if (error) { res.status(500).json(error); } else {
        res.status(200).json({ uri: `${BASE_URL}/files/${filename}` });
      }
    });
  } else {
    res.status(403).json({ message: 'File broken' });
  }
});

module.exports = router;
