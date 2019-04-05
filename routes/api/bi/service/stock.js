import { sequelizePostgres, pool } from '../../../../utils'
// import { pool } from '../../../../utils'

const getListArticleIAM = async () => {
    const query = 'select * from sap_mara order by article_no ASC LIMIT 2'
    const listArticle = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })
    // console.log('lll', listArticle.recordset)
    // console.log('lllx', listArticle)
    return listArticle
}

const seviceGetStockList = async (articleNo, date, plantKey) => {
    const NewarticleNo = (articleNo ? articleNo : '')
    const NewDate = (date ? date : '')
    const NewplantKey = (plantKey ? plantKey : '')
    console.log(NewarticleNo, NewDate, NewplantKey)
    const queryStr = `SELECT TOP (1000) [DATE_KEY]
    ,[PLANT_KEY]
    ,[SLOC_KEY]
    ,[ITEM_KEY]
    ,[UNITS_ON_HAND_SAP]
    ,[TOT_STOCK_VAL_SAP]
FROM [PRD_ILMDW_SYBASE].[dbo].[M_STOCK_DAILY] 
where DATE_KEY = '${NewDate}' and ITEM_KEY = '${NewarticleNo}' and PLANT_KEY = '${NewplantKey}'`
    console.log(queryStr)
    const data = (await pool.request().query(queryStr))
    console.log('errX')
    //Example Query
    // const selectQnumber = (await pool.request()
    // .input('startDate', startDate)
    // .input('endDate', endDate)
    // .query('select qnumber from qbook where qdate >= @startDate AND qdate <= @endDate'))

    // console.log(data.recordset)
    return data.recordset
}


export default {
    seviceGetStockList,
    getListArticleIAM

}