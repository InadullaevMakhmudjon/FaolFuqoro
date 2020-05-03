const { prisma } = require('../generated/prisma-client');
const roles = require('./roles');
const statuses = require('./status');
const users = require('./users');
const people = require('./people');
const reports = require('./reports');
const types = require('./report-types');

const execute = (data, callBack) => new Promise(asnyc (resolve, reject) => {
  try{
    for(let i =0; i<data.length; i +=1) {
      await callBack(data[i]);
    }
    resolve()
  }catch(e) {
    reject(e)
  }
});

async function seed() {
  try {
    await execute(roles, prisma.createRole);
    await execute(statuses, prisma.createStatus);
    await execute(types, prisma.createReportType);
    await execute(people, prisma.createPeople);
    await execute(users, prisma.createUser);
    await execute(reports, prisma.createReport);
    console.log('Done');
  } catch (e) {
    console.log(e);
  }
}

seed();
