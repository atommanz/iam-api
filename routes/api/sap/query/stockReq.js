import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { stockReqType } from '../inputtype/stockReq'
import { getDeliveryType } from '../service/deliveryType'
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
        // siteCode: {
        //     type: GraphQLString
        // }
    },
    resolve: async function (_, args) {
        const newList = []

        const articleType = await getDeliveryType(args.articleNo)
        console.log('arr', articleType)
        if (articleType.delivery_type === 'DC' || articleType.delivery_type === 'XD') {
            let site = '1100'
            const outBapi = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, site)
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
                    // console.log(value.DELKZ)
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
                var topValues = newList.sort((a, b) => b.MNG01 - a.MNG01).slice(0, 3)
                return topValues
            }
        }
        else if (articleType.delivery_type === 'ST' || articleType.delivery_type === 'XD-HALF') {
            let siteList
            if (articleType.delivery_type === 'ST') { siteList = branchList12plus }
            else if (articleType.delivery_type === 'XD-HALF') { siteList = branchList }
            const promMap = siteList.map(async (v) => {
                // console.log(v)
                const outBapi = await callBapi_MD_STOCK_REQUIREMENTS_LIST_API(args.articleNo, v)
                // console.log(outBapi)
                if (outBapi.lenth === 0) {
                    newList.push({
                        DELKZ: "",
                        DAT01: "",
                        EXTRA: "",
                        MNG01: ""
                    })
                }
                else {
                    newList.push(outBapi[0])
                }
            })
            await Promise.all(promMap)
            // console.log('newList', newList)
            const newListFilter = newList.filter((value, index) => {
                // console.log(value.DELKZ)
                return (value.DELKZ === 'LA' || value.DELKZ === 'BE')
            })
            if (newListFilter.length === 0) {
                newListFilter.push({
                    DELKZ: "",
                    DAT01: "",
                    EXTRA: "",
                    MNG01: ""
                })
                return newListFilter
            }
            // return newListFilter
            var topValues = newListFilter.sort((a, b) => b.MNG01 - a.MNG01).slice(0, 3)
            return topValues
        }



    }
}

export default {
    getStockReqList
}