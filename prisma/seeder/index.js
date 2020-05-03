const { prisma } = require('../generated/prisma-client');
const roles = require('./roles');
const statuses = require('./status');
const users = require('./users');
const people = require('./people');
const reports = require('./reports');
const types = require('./report-types');

const execute = (data, callBack) => data.reduce(
  (p, x) => p.then(() => callBack(x)), Promise.resolve(),
);

async function seed() {
  try {
    await execute(roles, prisma.createRole);
    await execute(statuses, prisma.createStatus);
    await execute(types, prisma.createReportType);
    await execute(people, prisma.createPeople);
    await execute(users, prisma.createUser);
    await execute(reports, prisma.createReport);
    // eslint-disable-next-line no-console
    console.log('Done');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

seed();
