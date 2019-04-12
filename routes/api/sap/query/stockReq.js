import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockReqType } from '../inputtype/stockReq'
import { callBapi_MD_STOCK_REQUIREMENTS_LIST_API } from '../service/stockRequirementsList'


const getStockReqList = {
    type: new GraphQLList(stockReqType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        siteCode: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const newList = []
        const outBapi = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, args.siteCode)
        if (outBapi.lenth === 0) {
            newList.push({
                DELKZ: "",
                DAT01: "",
                EXTRA: "",
                MNG01: ""
            })
        }

        const promMap = outBapi.map((value, index) => {
            if (value.DELKZ === 'LA' || value.DELKZ === 'BE') {
                newList.push(value)
            }
        })
        await Promise.all(promMap)

        return newList

    }
}

export default {
    getStockReqList
}