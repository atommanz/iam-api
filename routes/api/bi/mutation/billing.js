import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { billingType, billingSumType } from '../inputtype/billing'
const addProduct = {
    type: new GraphQLList(billingType),
    args: {
        ITEM_KEY: {
            type: GraphQLString,
            // description: "article number",
        },
        DATE_KEY: {
            type: GraphQLString,
        },
        DIST_CH_KEY: {
            type: GraphQLString,
        },
        CUSTOMER_KEY: {
            type: GraphQLString,
        },
        MC_CD: {
            type: GraphQLString,
        },
        MCH3_CD: {
            type: GraphQLString,
        },
        NET_SALES_QTY: {
            type: GraphQLString,
        },
        CURRENCY_CD: {
            type: GraphQLString,
        },
        TOT_SALES_VAL: {
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
    type: new GraphQLList(billingSumType),
    args: {
        ITEM_KEY: {
            type: GraphQLString,
        },
        amount: {
            type: GraphQLString,
        },
        quantity: {
            type: GraphQLString,
        },
        cost: {
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

export default {
    addProduct,
    addProduct2
}