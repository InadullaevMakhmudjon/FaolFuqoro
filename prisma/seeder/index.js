const { prisma } = require('../generated/prisma-client');
const roles = require('./roles');
const statuses = require('./status');
const users = require('./users');
const people = require('./people');
const reports = require('./reports');

const execute = (data, callBack) => new Promise((resolve, reject) => {
  Promise.all(data.map((model) => callBack(model)))
    .then(() => resolve())
    .catch((err) => reject(err));
});

Promise.all([
  execute(roles, prisma.createRole),
  execute(statuses, prisma.createStatus),
  execute(people, prisma.createPeople),
  execute(users, prisma.createUser),
  execute(reports, prisma.createReport),
])
  .then(() => console.log('Done'))
  .catch((err) => console.log(err));
