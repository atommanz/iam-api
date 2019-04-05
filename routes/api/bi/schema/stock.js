import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import { getStockList, getBranchQtyForecast } from '../query/stock'
import { addProduct,addProduct2 } from '../mutation/stock'

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        getStockList: getStockList,
        getBranchQtyForecast: getBranchQtyForecast
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