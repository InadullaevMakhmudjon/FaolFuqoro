"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Status",
    embedded: false
  },
  {
    name: "People",
    embedded: false
  },
  {
    name: "ReportType",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Closer",
    embedded: false
  },
  {
    name: "Report",
    embedded: false
  },
  {
    name: "ReportComment",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
