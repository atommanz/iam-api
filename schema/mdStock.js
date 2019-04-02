import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

import { getHey, getProducts, getProductByPrice,logUgetAtomnlockfn } from './products/query'
import { addProduct, deleteProduct } from './products/mutation'
import sql from 'mssql'

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        hey: getHey,
        getProducts: getProducts,
        getProductByPrice: getProductByPrice
    }
});
var mutationType = new GraphQLObjectType({
    name: "mutationProduct",
    description: "mutation of product",
    fields: {
        addProduct: addProduct,
        deleteProduct: deleteProduct
    }
});
var MyGraphQLSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

const atomConnectDB = async () => {
    const ListDatabases = await StoreDB.find()
    return ListDatabases
}


export default MyGraphQLSchema