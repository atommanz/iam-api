import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import { getBillingList, getSumBilling } from '../query/billing'
import { addProduct,addProduct2 } from '../mutation/billing'

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        getBillingList: getBillingList,
        getSumBilling: getSumBilling
    }
});
var mutationType = new GraphQLObjectType({
    name: "mutationProduct",
    description: "mutation of product",
    fields: {
        addProduct: addProduct,
        addProduct2:addProduct2
        // deleteProduct: deleteProduct
    }
});
var MyGraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
export default MyGraphQLSchema