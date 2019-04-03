import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import { getStockReqList } from '../query/stockReq'
import { addProduct } from '../mutation/stockReq'

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        getStockReqList: getStockReqList
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