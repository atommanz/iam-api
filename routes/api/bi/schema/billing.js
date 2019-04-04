import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import { getBillingList } from '../query/billing'
import { addProduct } from '../mutation/billing'

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        getBillingList: getBillingList
    }
});
var mutationType = new GraphQLObjectType({
    name: "mutationProduct",
    description: "mutation of product",
    fields: {
        addProduct: addProduct,
        // deleteProduct: deleteProduct
    }
});
var MyGraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
export default MyGraphQLSchema