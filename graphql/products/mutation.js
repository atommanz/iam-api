import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { productType } from './input'
import products from '../../data'
var addProduct = {
    type: new GraphQLList(productType),
    args: {
        name: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },
        category: {
            type: new GraphQLList(GraphQLString)
        }
    },
    resolve: function (_, args) {
        var product = {
            name: args.name,
            price: args.price,
            category: args.category
        }
        products.push(product)
        return products
    }
}
var deleteProduct = {
    type: new GraphQLList(productType),
    args: {
        name: {
            type: GraphQLString
        }
    },
    resolve: function (_, args) {
        return products.filter(function (product) {
            return product.name != args.name // bad
        })
    }
}
export default {
    addProduct: addProduct,
    deleteProduct: deleteProduct
}