import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

const billingType = new GraphQLObjectType({
    name: "BillingType",
    description: "out from SQL FCT_SVE_BLS_PERFORMANCE_DAILY",
    fields: () => ({
        ITEM_KEY: {
            type: GraphQLString,
            description: "article number",
        },
        DATE_KEY: {
            type: GraphQLString,
            description: "date",
        },
        DIST_CH_KEY: {
            type: GraphQLString,
            description: "channel",
        },
        CUSTOMER_KEY: {
            type: GraphQLString,
            description: "cus key",
        },
        MC_CD: {
            type: GraphQLString,
            description: "MC_CD",
        },
        MCH3_CD: {
            type: GraphQLString,
            description: "type ex. PW1",
        },
        NET_SALES_QTY: {
            type: GraphQLString,
            description: "qty.",
        },
        CURRENCY_CD: {
            type: GraphQLString,
            description: "currency",
        },
        NET_SALES_PRICE: {
            type: GraphQLString,
            description: "slae price",
        }
    })
})

export default {
    billingType
}