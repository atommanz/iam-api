import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

const stockType = new GraphQLObjectType({
    name: "stockType",
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
        PLANT_KEY: {
            type: GraphQLString,
            description: "branch",
        },
        SLOC_KEY: {
            type: GraphQLString,
            description: "slocKey 001-004",
        },
        UNITS_ON_HAND_SAP: {
            type: GraphQLString,
            description: "Use this field",
        },
        TOT_STOCK_VAL_SAP: {
            type: GraphQLString,
            description: "..",
        }
    })
})

const stockBranchQtyType = new GraphQLObjectType({
    name: "stockBranchQtyType",
    description: "out from SQL FCT_SVE_BLS_PERFORMANCE_DAILY",
    fields: () => ({
        articleNo: {
            type: GraphQLString,
            description: "article number",
        },
        plant: {
            type: GraphQLString,
            description: "plant",
        },
        sloc001: {
            type: GraphQLString,
            description: "001",
        },
        sloc002: {
            type: GraphQLString,
            description: "002",
        },
        sloc003: {
            type: GraphQLString,
            description: "003",
        },
        sloc004: {
            type: GraphQLString,
            description: "004",
        }
    })
})

export default {
    stockType,
    stockBranchQtyType
}