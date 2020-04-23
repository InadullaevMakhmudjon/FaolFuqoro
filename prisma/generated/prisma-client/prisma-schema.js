module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregatePeople {
  count: Int!
}

type AggregateReport {
  count: Int!
}

type AggregateReportComment {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateStatus {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createPeople(data: PeopleCreateInput!): People!
  updatePeople(data: PeopleUpdateInput!, where: PeopleWhereUniqueInput!): People
  updateManyPeoples(data: PeopleUpdateManyMutationInput!, where: PeopleWhereInput): BatchPayload!
  upsertPeople(where: PeopleWhereUniqueInput!, create: PeopleCreateInput!, update: PeopleUpdateInput!): People!
  deletePeople(where: PeopleWhereUniqueInput!): People
  deleteManyPeoples(where: PeopleWhereInput): BatchPayload!
  createReport(data: ReportCreateInput!): Report!
  updateReport(data: ReportUpdateInput!, where: ReportWhereUniqueInput!): Report
  updateManyReports(data: ReportUpdateManyMutationInput!, where: ReportWhereInput): BatchPayload!
  upsertReport(where: ReportWhereUniqueInput!, create: ReportCreateInput!, update: ReportUpdateInput!): Report!
  deleteReport(where: ReportWhereUniqueInput!): Report
  deleteManyReports(where: ReportWhereInput): BatchPayload!
  createReportComment(data: ReportCommentCreateInput!): ReportComment!
  updateReportComment(data: ReportCommentUpdateInput!, where: ReportCommentWhereUniqueInput!): ReportComment
  updateManyReportComments(data: ReportCommentUpdateManyMutationInput!, where: ReportCommentWhereInput): BatchPayload!
  upsertReportComment(where: ReportCommentWhereUniqueInput!, create: ReportCommentCreateInput!, update: ReportCommentUpdateInput!): ReportComment!
  deleteReportComment(where: ReportCommentWhereUniqueInput!): ReportComment
  deleteManyReportComments(where: ReportCommentWhereInput): BatchPayload!
  createRole(data: RoleCreateInput!): Role!
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  updateManyRoles(data: RoleUpdateManyMutationInput!, where: RoleWhereInput): BatchPayload!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  deleteRole(where: RoleWhereUniqueInput!): Role
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  createStatus(data: StatusCreateInput!): Status!
  updateStatus(data: StatusUpdateInput!, where: StatusWhereUniqueInput!): Status
  updateManyStatuses(data: StatusUpdateManyMutationInput!, where: StatusWhereInput): BatchPayload!
  upsertStatus(where: StatusWhereUniqueInput!, create: StatusCreateInput!, update: StatusUpdateInput!): Status!
  deleteStatus(where: StatusWhereUniqueInput!): Status
  deleteManyStatuses(where: StatusWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type People {
  id: ID!
  name: String!
  phone: String!
  password: String!
  image: String!
  reports(where: ReportWhereInput, orderBy: ReportOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Report!]
}

type PeopleConnection {
  pageInfo: PageInfo!
  edges: [PeopleEdge]!
  aggregate: AggregatePeople!
}

input PeopleCreateInput {
  id: ID
  name: String!
  phone: String!
  password: String!
  image: String!
  reports: ReportCreateManyWithoutCreatorInput
}

input PeopleCreateOneWithoutReportsInput {
  create: PeopleCreateWithoutReportsInput
  connect: PeopleWhereUniqueInput
}

input PeopleCreateWithoutReportsInput {
  id: ID
  name: String!
  phone: String!
  password: String!
  image: String!
}

type PeopleEdge {
  node: People!
  cursor: String!
}

enum PeopleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  phone_ASC
  phone_DESC
  password_ASC
  password_DESC
  image_ASC
  image_DESC
}

type PeoplePreviousValues {
  id: ID!
  name: String!
  phone: String!
  password: String!
  image: String!
}

type PeopleSubscriptionPayload {
  mutation: MutationType!
  node: People
  updatedFields: [String!]
  previousValues: PeoplePreviousValues
}

input PeopleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PeopleWhereInput
  AND: [PeopleSubscriptionWhereInput!]
  OR: [PeopleSubscriptionWhereInput!]
  NOT: [PeopleSubscriptionWhereInput!]
}

input PeopleUpdateInput {
  name: String
  phone: String
  password: String
  image: String
  reports: ReportUpdateManyWithoutCreatorInput
}

input PeopleUpdateManyMutationInput {
  name: String
  phone: String
  password: String
  image: String
}

input PeopleUpdateOneRequiredWithoutReportsInput {
  create: PeopleCreateWithoutReportsInput
  update: PeopleUpdateWithoutReportsDataInput
  upsert: PeopleUpsertWithoutReportsInput
  connect: PeopleWhereUniqueInput
}

input PeopleUpdateWithoutReportsDataInput {
  name: String
  phone: String
  password: String
  image: String
}

input PeopleUpsertWithoutReportsInput {
  update: PeopleUpdateWithoutReportsDataInput!
  create: PeopleCreateWithoutReportsInput!
}

input PeopleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  reports_every: ReportWhereInput
  reports_some: ReportWhereInput
  reports_none: ReportWhereInput
  AND: [PeopleWhereInput!]
  OR: [PeopleWhereInput!]
  NOT: [PeopleWhereInput!]
}

input PeopleWhereUniqueInput {
  id: ID
}

type Query {
  people(where: PeopleWhereUniqueInput!): People
  peoples(where: PeopleWhereInput, orderBy: PeopleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [People]!
  peoplesConnection(where: PeopleWhereInput, orderBy: PeopleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PeopleConnection!
  report(where: ReportWhereUniqueInput!): Report
  reports(where: ReportWhereInput, orderBy: ReportOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Report]!
  reportsConnection(where: ReportWhereInput, orderBy: ReportOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReportConnection!
  reportComment(where: ReportCommentWhereUniqueInput!): ReportComment
  reportComments(where: ReportCommentWhereInput, orderBy: ReportCommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ReportComment]!
  reportCommentsConnection(where: ReportCommentWhereInput, orderBy: ReportCommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReportCommentConnection!
  role(where: RoleWhereUniqueInput!): Role
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  status(where: StatusWhereUniqueInput!): Status
  statuses(where: StatusWhereInput, orderBy: StatusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Status]!
  statusesConnection(where: StatusWhereInput, orderBy: StatusOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): StatusConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Report {
  id: ID!
  image: String!
  lat: Float!
  lng: Float!
  creator: People!
  comments(where: ReportCommentWhereInput, orderBy: ReportCommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ReportComment!]
  status: Status!
  createdAt: DateTime!
}

type ReportComment {
  id: ID!
  comment: String
  status: Status!
  report: Report!
  to: User!
  createdAt: DateTime!
}

type ReportCommentConnection {
  pageInfo: PageInfo!
  edges: [ReportCommentEdge]!
  aggregate: AggregateReportComment!
}

input ReportCommentCreateInput {
  id: ID
  comment: String
  status: StatusCreateOneInput!
  report: ReportCreateOneWithoutCommentsInput!
  to: UserCreateOneWithoutReportsInput!
}

input ReportCommentCreateManyWithoutReportInput {
  create: [ReportCommentCreateWithoutReportInput!]
  connect: [ReportCommentWhereUniqueInput!]
}

input ReportCommentCreateManyWithoutToInput {
  create: [ReportCommentCreateWithoutToInput!]
  connect: [ReportCommentWhereUniqueInput!]
}

input ReportCommentCreateWithoutReportInput {
  id: ID
  comment: String
  status: StatusCreateOneInput!
  to: UserCreateOneWithoutReportsInput!
}

input ReportCommentCreateWithoutToInput {
  id: ID
  comment: String
  status: StatusCreateOneInput!
  report: ReportCreateOneWithoutCommentsInput!
}

type ReportCommentEdge {
  node: ReportComment!
  cursor: String!
}

enum ReportCommentOrderByInput {
  id_ASC
  id_DESC
  comment_ASC
  comment_DESC
  createdAt_ASC
  createdAt_DESC
}

type ReportCommentPreviousValues {
  id: ID!
  comment: String
  createdAt: DateTime!
}

input ReportCommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  comment: String
  comment_not: String
  comment_in: [String!]
  comment_not_in: [String!]
  comment_lt: String
  comment_lte: String
  comment_gt: String
  comment_gte: String
  comment_contains: String
  comment_not_contains: String
  comment_starts_with: String
  comment_not_starts_with: String
  comment_ends_with: String
  comment_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReportCommentScalarWhereInput!]
  OR: [ReportCommentScalarWhereInput!]
  NOT: [ReportCommentScalarWhereInput!]
}

type ReportCommentSubscriptionPayload {
  mutation: MutationType!
  node: ReportComment
  updatedFields: [String!]
  previousValues: ReportCommentPreviousValues
}

input ReportCommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReportCommentWhereInput
  AND: [ReportCommentSubscriptionWhereInput!]
  OR: [ReportCommentSubscriptionWhereInput!]
  NOT: [ReportCommentSubscriptionWhereInput!]
}

input ReportCommentUpdateInput {
  comment: String
  status: StatusUpdateOneRequiredInput
  report: ReportUpdateOneRequiredWithoutCommentsInput
  to: UserUpdateOneRequiredWithoutReportsInput
}

input ReportCommentUpdateManyDataInput {
  comment: String
}

input ReportCommentUpdateManyMutationInput {
  comment: String
}

input ReportCommentUpdateManyWithoutReportInput {
  create: [ReportCommentCreateWithoutReportInput!]
  delete: [ReportCommentWhereUniqueInput!]
  connect: [ReportCommentWhereUniqueInput!]
  set: [ReportCommentWhereUniqueInput!]
  disconnect: [ReportCommentWhereUniqueInput!]
  update: [ReportCommentUpdateWithWhereUniqueWithoutReportInput!]
  upsert: [ReportCommentUpsertWithWhereUniqueWithoutReportInput!]
  deleteMany: [ReportCommentScalarWhereInput!]
  updateMany: [ReportCommentUpdateManyWithWhereNestedInput!]
}

input ReportCommentUpdateManyWithoutToInput {
  create: [ReportCommentCreateWithoutToInput!]
  delete: [ReportCommentWhereUniqueInput!]
  connect: [ReportCommentWhereUniqueInput!]
  set: [ReportCommentWhereUniqueInput!]
  disconnect: [ReportCommentWhereUniqueInput!]
  update: [ReportCommentUpdateWithWhereUniqueWithoutToInput!]
  upsert: [ReportCommentUpsertWithWhereUniqueWithoutToInput!]
  deleteMany: [ReportCommentScalarWhereInput!]
  updateMany: [ReportCommentUpdateManyWithWhereNestedInput!]
}

input ReportCommentUpdateManyWithWhereNestedInput {
  where: ReportCommentScalarWhereInput!
  data: ReportCommentUpdateManyDataInput!
}

input ReportCommentUpdateWithoutReportDataInput {
  comment: String
  status: StatusUpdateOneRequiredInput
  to: UserUpdateOneRequiredWithoutReportsInput
}

input ReportCommentUpdateWithoutToDataInput {
  comment: String
  status: StatusUpdateOneRequiredInput
  report: ReportUpdateOneRequiredWithoutCommentsInput
}

input ReportCommentUpdateWithWhereUniqueWithoutReportInput {
  where: ReportCommentWhereUniqueInput!
  data: ReportCommentUpdateWithoutReportDataInput!
}

input ReportCommentUpdateWithWhereUniqueWithoutToInput {
  where: ReportCommentWhereUniqueInput!
  data: ReportCommentUpdateWithoutToDataInput!
}

input ReportCommentUpsertWithWhereUniqueWithoutReportInput {
  where: ReportCommentWhereUniqueInput!
  update: ReportCommentUpdateWithoutReportDataInput!
  create: ReportCommentCreateWithoutReportInput!
}

input ReportCommentUpsertWithWhereUniqueWithoutToInput {
  where: ReportCommentWhereUniqueInput!
  update: ReportCommentUpdateWithoutToDataInput!
  create: ReportCommentCreateWithoutToInput!
}

input ReportCommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  comment: String
  comment_not: String
  comment_in: [String!]
  comment_not_in: [String!]
  comment_lt: String
  comment_lte: String
  comment_gt: String
  comment_gte: String
  comment_contains: String
  comment_not_contains: String
  comment_starts_with: String
  comment_not_starts_with: String
  comment_ends_with: String
  comment_not_ends_with: String
  status: StatusWhereInput
  report: ReportWhereInput
  to: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReportCommentWhereInput!]
  OR: [ReportCommentWhereInput!]
  NOT: [ReportCommentWhereInput!]
}

input ReportCommentWhereUniqueInput {
  id: ID
}

type ReportConnection {
  pageInfo: PageInfo!
  edges: [ReportEdge]!
  aggregate: AggregateReport!
}

input ReportCreateInput {
  id: ID
  image: String!
  lat: Float!
  lng: Float!
  creator: PeopleCreateOneWithoutReportsInput!
  comments: ReportCommentCreateManyWithoutReportInput
  status: StatusCreateOneInput!
}

input ReportCreateManyWithoutCreatorInput {
  create: [ReportCreateWithoutCreatorInput!]
  connect: [ReportWhereUniqueInput!]
}

input ReportCreateOneWithoutCommentsInput {
  create: ReportCreateWithoutCommentsInput
  connect: ReportWhereUniqueInput
}

input ReportCreateWithoutCommentsInput {
  id: ID
  image: String!
  lat: Float!
  lng: Float!
  creator: PeopleCreateOneWithoutReportsInput!
  status: StatusCreateOneInput!
}

input ReportCreateWithoutCreatorInput {
  id: ID
  image: String!
  lat: Float!
  lng: Float!
  comments: ReportCommentCreateManyWithoutReportInput
  status: StatusCreateOneInput!
}

type ReportEdge {
  node: Report!
  cursor: String!
}

enum ReportOrderByInput {
  id_ASC
  id_DESC
  image_ASC
  image_DESC
  lat_ASC
  lat_DESC
  lng_ASC
  lng_DESC
  createdAt_ASC
  createdAt_DESC
}

type ReportPreviousValues {
  id: ID!
  image: String!
  lat: Float!
  lng: Float!
  createdAt: DateTime!
}

input ReportScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  lat: Float
  lat_not: Float
  lat_in: [Float!]
  lat_not_in: [Float!]
  lat_lt: Float
  lat_lte: Float
  lat_gt: Float
  lat_gte: Float
  lng: Float
  lng_not: Float
  lng_in: [Float!]
  lng_not_in: [Float!]
  lng_lt: Float
  lng_lte: Float
  lng_gt: Float
  lng_gte: Float
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReportScalarWhereInput!]
  OR: [ReportScalarWhereInput!]
  NOT: [ReportScalarWhereInput!]
}

type ReportSubscriptionPayload {
  mutation: MutationType!
  node: Report
  updatedFields: [String!]
  previousValues: ReportPreviousValues
}

input ReportSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReportWhereInput
  AND: [ReportSubscriptionWhereInput!]
  OR: [ReportSubscriptionWhereInput!]
  NOT: [ReportSubscriptionWhereInput!]
}

input ReportUpdateInput {
  image: String
  lat: Float
  lng: Float
  creator: PeopleUpdateOneRequiredWithoutReportsInput
  comments: ReportCommentUpdateManyWithoutReportInput
  status: StatusUpdateOneRequiredInput
}

input ReportUpdateManyDataInput {
  image: String
  lat: Float
  lng: Float
}

input ReportUpdateManyMutationInput {
  image: String
  lat: Float
  lng: Float
}

input ReportUpdateManyWithoutCreatorInput {
  create: [ReportCreateWithoutCreatorInput!]
  delete: [ReportWhereUniqueInput!]
  connect: [ReportWhereUniqueInput!]
  set: [ReportWhereUniqueInput!]
  disconnect: [ReportWhereUniqueInput!]
  update: [ReportUpdateWithWhereUniqueWithoutCreatorInput!]
  upsert: [ReportUpsertWithWhereUniqueWithoutCreatorInput!]
  deleteMany: [ReportScalarWhereInput!]
  updateMany: [ReportUpdateManyWithWhereNestedInput!]
}

input ReportUpdateManyWithWhereNestedInput {
  where: ReportScalarWhereInput!
  data: ReportUpdateManyDataInput!
}

input ReportUpdateOneRequiredWithoutCommentsInput {
  create: ReportCreateWithoutCommentsInput
  update: ReportUpdateWithoutCommentsDataInput
  upsert: ReportUpsertWithoutCommentsInput
  connect: ReportWhereUniqueInput
}

input ReportUpdateWithoutCommentsDataInput {
  image: String
  lat: Float
  lng: Float
  creator: PeopleUpdateOneRequiredWithoutReportsInput
  status: StatusUpdateOneRequiredInput
}

input ReportUpdateWithoutCreatorDataInput {
  image: String
  lat: Float
  lng: Float
  comments: ReportCommentUpdateManyWithoutReportInput
  status: StatusUpdateOneRequiredInput
}

input ReportUpdateWithWhereUniqueWithoutCreatorInput {
  where: ReportWhereUniqueInput!
  data: ReportUpdateWithoutCreatorDataInput!
}

input ReportUpsertWithoutCommentsInput {
  update: ReportUpdateWithoutCommentsDataInput!
  create: ReportCreateWithoutCommentsInput!
}

input ReportUpsertWithWhereUniqueWithoutCreatorInput {
  where: ReportWhereUniqueInput!
  update: ReportUpdateWithoutCreatorDataInput!
  create: ReportCreateWithoutCreatorInput!
}

input ReportWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  lat: Float
  lat_not: Float
  lat_in: [Float!]
  lat_not_in: [Float!]
  lat_lt: Float
  lat_lte: Float
  lat_gt: Float
  lat_gte: Float
  lng: Float
  lng_not: Float
  lng_in: [Float!]
  lng_not_in: [Float!]
  lng_lt: Float
  lng_lte: Float
  lng_gt: Float
  lng_gte: Float
  creator: PeopleWhereInput
  comments_every: ReportCommentWhereInput
  comments_some: ReportCommentWhereInput
  comments_none: ReportCommentWhereInput
  status: StatusWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReportWhereInput!]
  OR: [ReportWhereInput!]
  NOT: [ReportWhereInput!]
}

input ReportWhereUniqueInput {
  id: ID
}

type Role {
  id: ID!
  name: String!
}

type RoleConnection {
  pageInfo: PageInfo!
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  id: ID
  name: String!
}

input RoleCreateOneInput {
  create: RoleCreateInput
  connect: RoleWhereUniqueInput
}

type RoleEdge {
  node: Role!
  cursor: String!
}

enum RoleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type RolePreviousValues {
  id: ID!
  name: String!
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
  AND: [RoleSubscriptionWhereInput!]
  OR: [RoleSubscriptionWhereInput!]
  NOT: [RoleSubscriptionWhereInput!]
}

input RoleUpdateDataInput {
  name: String
}

input RoleUpdateInput {
  name: String
}

input RoleUpdateManyMutationInput {
  name: String
}

input RoleUpdateOneRequiredInput {
  create: RoleCreateInput
  update: RoleUpdateDataInput
  upsert: RoleUpsertNestedInput
  connect: RoleWhereUniqueInput
}

input RoleUpsertNestedInput {
  update: RoleUpdateDataInput!
  create: RoleCreateInput!
}

input RoleWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [RoleWhereInput!]
  OR: [RoleWhereInput!]
  NOT: [RoleWhereInput!]
}

input RoleWhereUniqueInput {
  id: ID
}

type Status {
  id: ID!
  name: String!
}

type StatusConnection {
  pageInfo: PageInfo!
  edges: [StatusEdge]!
  aggregate: AggregateStatus!
}

input StatusCreateInput {
  id: ID
  name: String!
}

input StatusCreateOneInput {
  create: StatusCreateInput
  connect: StatusWhereUniqueInput
}

type StatusEdge {
  node: Status!
  cursor: String!
}

enum StatusOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
}

type StatusPreviousValues {
  id: ID!
  name: String!
}

type StatusSubscriptionPayload {
  mutation: MutationType!
  node: Status
  updatedFields: [String!]
  previousValues: StatusPreviousValues
}

input StatusSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: StatusWhereInput
  AND: [StatusSubscriptionWhereInput!]
  OR: [StatusSubscriptionWhereInput!]
  NOT: [StatusSubscriptionWhereInput!]
}

input StatusUpdateDataInput {
  name: String
}

input StatusUpdateInput {
  name: String
}

input StatusUpdateManyMutationInput {
  name: String
}

input StatusUpdateOneRequiredInput {
  create: StatusCreateInput
  update: StatusUpdateDataInput
  upsert: StatusUpsertNestedInput
  connect: StatusWhereUniqueInput
}

input StatusUpsertNestedInput {
  update: StatusUpdateDataInput!
  create: StatusCreateInput!
}

input StatusWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [StatusWhereInput!]
  OR: [StatusWhereInput!]
  NOT: [StatusWhereInput!]
}

input StatusWhereUniqueInput {
  id: ID
}

type Subscription {
  people(where: PeopleSubscriptionWhereInput): PeopleSubscriptionPayload
  report(where: ReportSubscriptionWhereInput): ReportSubscriptionPayload
  reportComment(where: ReportCommentSubscriptionWhereInput): ReportCommentSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  status(where: StatusSubscriptionWhereInput): StatusSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  phone: String!
  username: String!
  password: String!
  image: String!
  role: Role!
  reports(where: ReportCommentWhereInput, orderBy: ReportCommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ReportComment!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  name: String!
  phone: String!
  username: String!
  password: String!
  image: String!
  role: RoleCreateOneInput!
  reports: ReportCommentCreateManyWithoutToInput
}

input UserCreateOneWithoutReportsInput {
  create: UserCreateWithoutReportsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutReportsInput {
  id: ID
  name: String!
  phone: String!
  username: String!
  password: String!
  image: String!
  role: RoleCreateOneInput!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  phone_ASC
  phone_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  image_ASC
  image_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  phone: String!
  username: String!
  password: String!
  image: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  phone: String
  username: String
  password: String
  image: String
  role: RoleUpdateOneRequiredInput
  reports: ReportCommentUpdateManyWithoutToInput
}

input UserUpdateManyMutationInput {
  name: String
  phone: String
  username: String
  password: String
  image: String
}

input UserUpdateOneRequiredWithoutReportsInput {
  create: UserCreateWithoutReportsInput
  update: UserUpdateWithoutReportsDataInput
  upsert: UserUpsertWithoutReportsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutReportsDataInput {
  name: String
  phone: String
  username: String
  password: String
  image: String
  role: RoleUpdateOneRequiredInput
}

input UserUpsertWithoutReportsInput {
  update: UserUpdateWithoutReportsDataInput!
  create: UserCreateWithoutReportsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  role: RoleWhereInput
  reports_every: ReportCommentWhereInput
  reports_some: ReportCommentWhereInput
  reports_none: ReportCommentWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    