
require('babel/register');

const service = require('./routes/api/bi/service/stock')


function main() {
  console.log('main work')
  // service.mainStock('150004763','20190408') //ZBO2
  // service.mainStock('150004500','20190408') //ZBO1
  // service.mainStock('150004498','20190408') //ZNM1
  service.mainStock('300000013','20190408') //ZSV1
  
  
  // service.seviceGetStockList('110000288','20190404','1202')
    .then((xxx) => {
      console.log('main todo', xxx)
    }).catch((error) => {
      console.log('case error',error)
    })
}
main()
