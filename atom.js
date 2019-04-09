
require('babel/register');

const service = require('./routes/api/bi/service/stock')


function main() {
  console.log('main work')
  service.mainStock('150004763','20190408') //ZBO2
  // service.mainStock('150004500','20190408') //ZBO1
  
  // service.seviceGetStockList('110000288','20190404','1202')
    .then((xxx) => {
      console.log('main todo', xxx)
      // console.log('response total %s <', result.length)
      // console.log('main end')
    }).catch((error) => {
      console.log('case error',error)
    })
}
main()
