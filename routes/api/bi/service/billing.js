import sql from 'mssql'
import { pool } from '../../../../utils'

const serviceGetBillingList = async (articleNo, startDate, endDate) => {
    const queryStr = `SELECT TOP (1000) [ITEM_KEY]
  ,[DATE_KEY]
  ,[DIST_CH_KEY]
  ,[CUSTOMER_KEY]
  ,[MC_CD]
  ,[MCH3_CD]
  ,[NET_SALES_QTY]
  ,[CURRENCY_CD]
  ,[NET_SALES_PRICE]
FROM [PRD_ILMDW_SYBASE].[dbo].[FCT_SVE_BLS_PERFORMANCE_DAILY]
where ITEM_KEY = '110006018' and DATE_KEY between '20190130' and '20190228'`

    const data = (await pool.request()
        .query(queryStr))

    //Example Query
    // const selectQnumber = (await pool.request()
    // .input('startDate', startDate)
    // .input('endDate', endDate)
    // .query('select qnumber from qbook where qdate >= @startDate AND qdate <= @endDate'))

    console.log(data.recordset)
    return data.recordset
}


export default {
    serviceGetBillingList
}

