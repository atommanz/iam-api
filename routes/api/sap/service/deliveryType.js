import { sequelizePostgres, pool, sequelize } from '../../../../utils'
import config from '../../../../config/config'
import moment from 'moment'
import fs, { copyFileSync } from 'fs'
import { POINT_CONVERSION_COMPRESSED, WSAESOCKTNOSUPPORT } from 'constants';
// import { pool } from '../../../../utils'
const branchList = config.branch
const slocKeyList = config.slocKey
let outputTemplate = JSON.parse(JSON.stringify(config.outputStockTemplate));
const outputCaseElse = config.outputStockCaseElse

const getDeliveryType = async (articleNo) => {
    const query = `select
    bk.article_no,
    case when bk.delivery_type!=up.delivery_type and bk.delivery_type='ST' then 'XD-HALF'
    when bk.delivery_type!=up.delivery_type and bk.delivery_type!='ST' then 'DC'
    else bk.delivery_type
    end as delivery_type
from sap_marc bk inner join sap_marc up on bk.article_no=up.article_no and bk.branch='1202' and up.branch='1206'
where bk.article_no like '${articleNo}'
limit 500`
    const deliveryType = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })
    // console.log(deliveryType)
    return deliveryType
}

export default {
    getDeliveryType
}