import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

const stockReqType = new GraphQLObjectType({
    name: "stockReq",
    description: "out from MD_STOCK_REQUIREMENTS_LIST_API",
    fields: () => ({
        DELKZ: {
            type: GraphQLString,
            description: "LA = Inbound Delivery, BE = Purchase Order",
        },
        DAT01: {
            type: GraphQLString,
            description: "Delivery date",
        },
        EXTRA: {
            type: GraphQLString,
            description: "PO Number/PO Line item",
        },
        MNG01: {
            type: GraphQLString,
            description: "Quantity received or quantity required",
        }
    })
})

export default {
    stockReqType
}