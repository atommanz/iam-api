import sql from 'mssql'
import { pool } from '../../../../utils'

const serviceGetBillingList = async (articleNo, startDate, endDate) => {
    const NewarticleNo = (articleNo ? articleNo : '')
    const NewstartDate = (startDate ? startDate : '')
    const NewendDate = (endDate ? endDate : '')
    console.log(NewarticleNo, NewstartDate, NewendDate)
    const queryStr = `SELECT TOP (1000) [ITEM_KEY]
  ,[DATE_KEY]
  ,[DIST_CH_KEY]
  ,[CUSTOMER_KEY]
  ,[MC_CD]
  ,[MCH3_CD]
  ,[NET_SALES_QTY]
  ,[CURRENCY_CD]
  ,[TOT_SALES_VAL]
  ,[COGS_VAL]
FROM [PRD_ILMDW_SYBASE].[dbo].[FCT_SVE_BLS_PERFORMANCE_DAILY] 
where ITEM_KEY = '${NewarticleNo}' and DATE_KEY between '${NewstartDate}' and '${NewendDate}'`
console.log(queryStr)
    const data = (await pool.request()
        .query(queryStr))

    //Example Query
    // const selectQnumber = (await pool.request()
    // .input('startDate', startDate)
    // .input('endDate', endDate)
    // .query('select qnumber from qbook where qdate >= @startDate AND qdate <= @endDate'))

    // console.log(data.recordset)
    return data.recordset
}


export default {
    serviceGetBillingList
}

