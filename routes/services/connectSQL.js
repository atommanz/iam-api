import sql from 'mssql'
import { pool } from '../../utils'

const testConnect = async (host, dbname, user, password, fromDate, toDate, strQuery) => {
    console.log('test Con')
    
    const data = (await pool.request()
    .query(`SELECT TOP (2) [ITEM_KEY],[DATE_KEY]
    FROM [PRD_ILMDW_SYBASE].[dbo].[FCT_SVE_BLS_PERFORMANCE_DAILY]`))

    //Example Query
    // const selectQnumber = (await pool.request()
    // .input('startDate', startDate)
    // .input('endDate', endDate)
    // .query('select qnumber from qbook where qdate >= @startDate AND qdate <= @endDate'))

    console.log(data.recordset)
    return data.recordset
}


export default {
    testConnect
}

