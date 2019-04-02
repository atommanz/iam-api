import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../../../graphql/schema'

const router = express.Router()

router.use('/', graphqlHTTP({ schema: schema, graphiql: true }))
export default router