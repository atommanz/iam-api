import express from 'express'
import graphqlHTTP from 'express-graphql'
// import schema from '../../../graphql/schema'
import schema_billing from './schema/billing'
import schema_stock from './schema/stock'
const router = express.Router()

router.use('/billing', graphqlHTTP({ schema: schema_billing, graphiql: true }))

router.use('/stock', graphqlHTTP({ schema: schema_stock, graphiql: true }))
export default router