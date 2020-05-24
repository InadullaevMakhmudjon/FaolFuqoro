const router = require('express').Router();
const twilio = require('twilio');
const { Prisma } = require('prisma-binding');
const { typeDefs } = require('../../prisma/generated/prisma-client/prisma-schema');

const prisma = new Prisma({
  typeDefs,
  endpoint: 'http://localhost:4466',
});

require('dotenv').config();

const { BASE_URL, TWILIO_SID, TWILIO_TOKEN } = process.env;

const client = twilio(TWILIO_SID, TWILIO_TOKEN);
const service = client.verify.services(process.env.TWILIO_SERVICE_ID);

router.post('/send', (req, res) => {
  if (req.query.phone) {
    prisma.$exists.people({
      phone: `+${req.query.phone}`,
    }).then((exists) => {
      if (exists) {
        service.verifications.create({
          to: `+${req.query.phone}`,
          channel: 'sms',
        }).then(() => res.sendStatus(200))
          .catch((err) => res.status(502).json(err));
      } else {
        res.status(401).json({ message: 'User is not registered yet' });
      }
    }).catch((err) => res.status(502).json(err));
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
      if (error) { res.status(502).json(error); } else {
        res.status(200).json({ uri: `${BASE_URL}/files/${filename}` });
      }
    });
  } else {
    res.status(403).json({ message: 'File broken' });
  }
});

function createCustom({
  image, lat, lng, phone, type, comment,
}) {
  return prisma.mutation.createReport({
    data: {
      image,
      lat,
      lng,
      creator: { connect: { phone: `+${phone}` } },
      status: { connect: { id: 1 } },
      type: { connect: { id: type } },
      comments: {
        create: {
          comment,
          status: { connect: { id: 1 } },
          to: { connect: { id: 1 } },
        },
      },
    },
  }, '{ id }');
}

router.post('/create-report', (req, res) => {
  if (req.files) {
    const { file } = req.files;
    const {
      lat, lng, comment, type, phone,
    } = req.body;
    const filename = `${(new Date().toISOString())}-${file.name}`;
    file.mv(`./files/${filename}`, (error) => {
      if (error) { res.status(502).json(error); } else {
        createCustom({
          image: `${BASE_URL}/files/${filename}`,
          lat,
          lng,
          comment,
          type,
          phone,
        })
          .then(() => { res.sendStatus(200); })
          .catch((err) => res.status(502).json(err));
      }
    });
  } else {
    res.status(403).json({ message: 'File broken' });
  }
});

module.exports = router;
/*
createCustom({
          image: `${BASE_URL}/files/${filename}`,
          lat,
          lng,
          comment,
          type,
          phone,
        }).then(() => {
          console.log('Successfully send response');
          res.status(200).json({ message: 'Error occured' });
        }).catch((err) => {
          console.log('Error occured');
          res.status(501).json(err);
        })
          .finally(() => console.log('Something went wrong'));
*/
