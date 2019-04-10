import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockType, stockBranchQtyType } from '../inputtype/stock'
import { seviceGetStockList, mainStock } from '../service/stock'


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
        const outStockList = await mainStock(args.articleNo, args.date)
        
        return outStockList

    }
}

export default {
    getStockList,
    getBranchQtyForecast
}