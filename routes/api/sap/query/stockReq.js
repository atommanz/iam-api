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
import config from '../../../../config/config'

const branchList = config.branch
const branchList12plus = config.branch.filter((member) => {
      return Number(member) >= 1200
    })

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
        console.log(outBapi)
        console.log(branchList,branchList12plus)
        if (outBapi.lenth === 0) {
            newList.push({
                DELKZ: "",
                DAT01: "",
                EXTRA: "",
                MNG01: ""
            })
            return newList
        }
        else {
            const promMap = outBapi.map((value, index) => {
                if (value.DELKZ === 'LA' || value.DELKZ === 'BE') {
                    newList.push(value)
                }
            })
            await Promise.all(promMap)

            if (newList.length === 0) {
                newList.push({
                    DELKZ: "",
                    DAT01: "",
                    EXTRA: "",
                    MNG01: ""
                })
            }
            return newList
        }
      

    }
}

export default {
    getStockReqList
}