
require('babel/register');

const service = require('./routes/api/bi/service/stock')
const serviceSAP = require('./routes/api/sap/service/deliveryType')
const config = require('./config/config')

const main = async()=> {
  const type = await serviceSAP.getDeliveryType('170110203')
  // console.log(type)
  // console.log(config.branch)
  // const branch12plus = config.branch.filter((member) => {
  //   return Number(member) >= 1200
  // })

  // console.log(branch12plus)
  // service.mainStock('150004763','20190408') //ZBO2
  // service.mainStock('150004500','20190408') //ZBO1
  // service.mainStock('150004498','20190408') //ZNM1
  // service.mainStock('300000013','20190408') //ZSV1


  // // service.seviceGetStockList('110000288','20190404','1202')
  //   .then((xxx) => {
  //     console.log('main todo', xxx)
  //   }).catch((error) => {
  //     console.log('case error',error)
  //   })
}
main()
