import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { billingType, billingSumType } from '../inputtype/billing'
import { serviceGetBillingList } from '../service/billing'


const getBillingList = {
    type: new GraphQLList(billingType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const outSQLbilling = await serviceGetBillingList(args.articleNo, args.startDate, args.endDate)
        return outSQLbilling

    }
}
const getSumBilling = {
    type: new GraphQLList(billingSumType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const arr = []
        const objOut = {}
        let quantity = 0
        let amount = 0
        let cost = 0
        // objOut.quantity = 0
        // objOut.amount = 0
        // objOut.cost = 0

        const outSQLbilling = await serviceGetBillingList(args.articleNo, args.startDate, args.endDate)
        if (outSQLbilling.length === 0) {
            arr.push({
                ITEM_KEY: args.articleNo,
                quantity: 0,
                amount: 0,
                cost: 0,
            })
            return arr
        }
        else {
            const promMap = outSQLbilling.map((value, index) => {
                // console.log(value)
                if (value.MCH3_CD === '24' && (value.DIST_CH_KEY === '10' || value.DIST_CH_KEY === '16')) {
                    // console.log('24 in', amount, value.TOT_SALES_VAL, quantity)
                    quantity = quantity + parseInt(value.NET_SALES_QTY)
                    amount = amount + parseFloat(value.TOT_SALES_VAL)
                    cost = cost + parseFloat(value.COGS_VAL)
                }
                else if (value.DIST_CH_KEY === '10') {
                    // console.log('ch 10', amount, quantity)
                    quantity = quantity + parseInt(value.NET_SALES_QTY)
                    amount = amount + Math.round(value.TOT_SALES_VAL * 100) / 100
                    cost = cost + parseFloat(value.COGS_VAL)
                }
                // console.log('dd', objOut.amount)
                objOut.ITEM_KEY = String(value.ITEM_KEY)
                objOut.quantity = String(quantity)
                objOut.amount = String(Math.round(amount * 100) / 100)
                objOut.cost = String(Math.round(cost * 100) / 100)
            })
            await Promise.all(promMap)
            await arr.push(objOut)
            // console.log('arr ', arr)
            return arr

        }

    }
}

export default {
    getBillingList,
    getSumBilling
}