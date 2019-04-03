import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema_stockReq from './schema/stockReq'

const router = express.Router()

router.use('/stock-req', graphqlHTTP({ schema: schema_stockReq, graphiql: true }))

export default router