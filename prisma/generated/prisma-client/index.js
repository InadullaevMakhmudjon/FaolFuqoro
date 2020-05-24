
Object.defineProperty(exports, '__esModule', { value: true });
const prisma_lib_1 = require('prisma-client-lib');
const { typeDefs } = require('./prisma-schema');

const models = [
  {
    name: 'Role',
    embedded: false,
  },
  {
    name: 'Status',
    embedded: false,
  },
  {
    name: 'People',
    embedded: false,
  },
  {
    name: 'ReportType',
    embedded: false,
  },
  {
    name: 'User',
    embedded: false,
  },
  {
    name: 'Report',
    embedded: false,
  },
  {
    name: 'ReportComment',
    embedded: false,
  },
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: 'http://localhost:4466',
});
exports.prisma = new exports.Prisma();
