import express from 'express'
import graphqlHTTP from 'express-graphql'
// import schema from '../../../graphql/schema'
import schema_billing from './schema/billing'
const router = express.Router()

router.use('/billing', graphqlHTTP({ schema: schema_billing, graphiql: true }))
export default router