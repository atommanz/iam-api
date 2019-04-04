import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import { billingType } from '../inputtype/billing'
import { serviceGetBillingList } from '../service/billing'


const getBillingList = {
    type: new GraphQLList(billingType),
    args: {
        articleNo: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLString
        },
        endDate: {
            type: GraphQLString
        }
    },
    resolve: async function (_, args) {
        const newList = []
        const outSQLbilling = await serviceGetBillingList(args.articleNo, args.startDate,args.endDate)
        // const promMap = outSQLbilling.map((value,index)=>{
        //     if(value.DELKZ === 'LA' || value.DELKZ ==='BE'){
        //         newList.push(value)
        //     }
        // })
        // await Promise.all(promMap)
        
        return outSQLbilling

    }
}

export default {
    getBillingList
}