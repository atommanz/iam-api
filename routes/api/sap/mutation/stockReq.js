import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockReqType } from '../inputtype/stockReq'
const addProduct = {
    type: new GraphQLList(stockReqType),
    args: {
        DELKZ: {
            type: GraphQLString,
        },
        DAT01: {
            type: GraphQLString,
        },
        EXTRA: {
            type: GraphQLString,
        },
        MNG01: {
            type: GraphQLString,
        }
    },
    resolve: async function (_, args) {
        var addPara = {
            DELKZ: 'args.name',
            DAT01: 'args.price',
            EXTRA: '2',
            MNG01: ''
        }
        const aa = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, args.siteCode)

        return aa.push(addPara)

    }
}
export default {
    addProduct
}