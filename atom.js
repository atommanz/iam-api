
require('babel/register');

const service = require('./routes/api/bi/service/stock')


function main() {
  console.log('main work')
  service.getListArticleIAM()
  // service.seviceGetStockList('110000288','20190404','1202')
    .then((xxx) => {
      console.log('main todo', xxx)
      // console.log('response total %s <', result.length)
      // console.log('main end')
    }).catch((error) => {
      console.log('case error')
    })
}
main()
