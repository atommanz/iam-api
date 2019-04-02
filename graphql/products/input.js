import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql'


var voteType = new GraphQLObjectType({
    name: "vote",
    description: "vote of The product",
    fields: () => ({
        star: {
            type: GraphQLInt,
            description: "one_star of the vote",
        },
        men: {
            type: GraphQLInt,
            description: "men of vote",
        },
        women: {
            type: GraphQLInt,
            description: "women of vote",
        }
    })
});
var productType = new GraphQLObjectType({
    name: "products",
    description: "Detail of The product",
    fields: () => ({
        ITEM_KEY: {
            type: GraphQLString,
            description: "Name of the product",
        },
        DATE_KEY: {
            type: GraphQLInt,
            description: "price of product",
        }
    })
});
export default {
    productType
}