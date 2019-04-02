import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { productType } from './input'
import { testConnect } from '../../routes/services/connectSQL'
import products from '../../data'
var getHey = {
    type: GraphQLString,
    resolve: function (_, args) {
        return products[1].name
    }
}
var getProducts = {
    type: new GraphQLList(productType),
    resolve: async function (_, args) {
        // return products
        const List = []
        const aa = await testConnect().then(res => {
            // console.log('ddd', products)
            // resolve(res)
            List.push(res)
            return res
        })
        return aa
       
    }
}
var getProductByPrice = {
    type: new GraphQLList(productType),
    args: {
        price: {
            type: GraphQLInt
        }
    },
    resolve: function (_, args) {
        var filterProduct = products.filter(function (product) {
            return product.price <= args.price
        })
        return filterProduct
    }
}

export default {
    getHey: getHey, // ไม่จำเป็นที่ชื่อต้องซ้ำกัน
    getProducts: getProducts,
    getProductByPrice: getProductByPrice
}