import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockType, stockBranchQtyType } from '../inputtype/stock'
const addProduct = {
    type: new GraphQLList(stockType),
    args: {
        ITEM_KEY: {
            type: GraphQLString,
        },
        DATE_KEY: {
            type: GraphQLString,
        },
        PLANT_KEY: {
            type: GraphQLString,
        },
        SLOC_KEY: {
            type: GraphQLString,
        },
        UNITS_ON_HAND_SAP: {
            type: GraphQLString,
        },
        TOT_STOCK_VAL_SAP: {
            type: GraphQLString,
        }
    },
    resolve: async function (_, args) {
        var addPara = {
            ITEM_KEY: '1'
        }
        const aa = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, args.siteCode)

        return aa.push(addPara)

    }
}

const addProduct2 = {
    type: new GraphQLList(stockBranchQtyType),
    args: {
        plant: {
            type: GraphQLString,
        },
        sloc001: {
            type: GraphQLInt,
        },
        sloc002: {
            type: GraphQLInt,
        },
        sloc003: {
            type: GraphQLInt,
        },
        sloc004: {
            type: GraphQLInt,
        }
    },
    resolve: async function (_, args) {
        var addPara = {
            articleNo: '1'
        }
        const aa = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, args.siteCode)

        return aa.push(addPara)

    }
}

export default {
    addProduct,
    addProduct2
}