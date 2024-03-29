import express from 'express'
import graphqlHTTP from 'express-graphql'
import apiRouter from './routes/api'
import { callBapi_MD_STOCK_REQUIREMENTS_LIST_API } from './routes/api/sap/service/stockRequirementsList'
import {
    pool,
    errorMessage,
} from './utils'

const app = express()
//240005879
pool.connect((err) => {
    /* istanbul ignore next */
    if (err) console.log('connecting to connection pool error', err)
    app.emit('appStarted')
    console.log('connection pool ready', process.env.NODE_ENV)
    
    // const outtt =  callBapi_MD_STOCK_REQUIREMENTS_LIST_API('110000539', '1100')
})
app.use('/api', apiRouter)
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App is running.')
});

