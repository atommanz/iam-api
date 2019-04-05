import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockType,  stockBranchQtyType} from '../inputtype/stock'
import { seviceGetStockList } from '../service/stock'


const getStockList = {
    type: new GraphQLList(stockType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const outSQLbilling = await seviceGetStockList(args.articleNo, args.date)
        return outSQLbilling

    }
}
const getBranchQtyForecast = {
    type: new GraphQLList(stockBranchQtyType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const ccc = [{
            articleNo:'1111',
            plant:'plant',
            sloc001:'sloc001',
            sloc002:'sloc002',
            sloc003:'sloc003',
            sloc004:'sloc004'
        }]
        
        return ccc

    }
}

export default {
    getStockList,
    getBranchQtyForecast
}