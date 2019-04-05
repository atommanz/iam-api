import { sequelizePostgres, pool, sequelize } from '../../../../utils'
import config from '../../../../config/config'
import moment from 'moment'
import { POINT_CONVERSION_COMPRESSED } from 'constants';
// import { pool } from '../../../../utils'
const branchList = config.branch

const getListArticleIAM = async () => {
    const query = 'select * from sap_mara order by article_no ASC LIMIT 2'
    const listArticle = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })

    return listArticle
}


const seviceGetStockList = async (articleNo, date) => {
    const NewarticleNo = (articleNo ? articleNo : '')
    const NewDate = (date ? date : '')
    console.log(NewarticleNo, NewDate)
    const queryStr = `SELECT TOP (1000) [DATE_KEY]
    ,[PLANT_KEY]
    ,[SLOC_KEY]
    ,[ITEM_KEY]
    ,[UNITS_ON_HAND_SAP]
    ,[TOT_STOCK_VAL_SAP]
FROM [PRD_ILMDW_SYBASE].[dbo].[M_STOCK_DAILY] 
where DATE_KEY = '${NewDate}' and ITEM_KEY = '${NewarticleNo}'`

    const listStock = await sequelize.query(queryStr, { type: sequelize.QueryTypes.SELECT })

    return listStock
}


const getArticleType = async (aritcleNo) => {
    const query = `select article_type from sap_mara where article_no = '${aritcleNo}' order by article_no ASC LIMIT 100`
    const articleType = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })
    return articleType[0].article_type
}

const getMaterialsList = async (aritcleNo) => {
    const query = `select article_no,component_article_no,component_qty from sap_mara_bom where article_no ='${aritcleNo}' order by article_no limit 100
    `
    const materialList = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })

    return materialList
}

const caseZBO2 = async (articleNo, date) => {
    const ZBO2useMat = await getMaterialsList(articleNo)
    const ZBO1useMat = []
    console.log(`ZBO2useMat `, ZBO2useMat)
    if (ZBO2useMat.length === 0) {
        return false
    }
    const promMap1 = ZBO2useMat.map(async (value, index) => {
        const findMatLastLv = await getMaterialsList(value.component_article_no)
        const qtyMidLv = parseInt(value.component_qty)
        if (findMatLastLv.length === 0) {
            console.log('case 0 ', qtyMidLv, value.component_qty)
            value.netQty = value.component_qty
            ZBO1useMat.push(value)
        }
        else {
            const promSubMap = findMatLastLv.map((subValue, subIndex) => {
                console.log('case 1 ', qtyMidLv, subValue.component_qty)
                subValue.netQty = String(qtyMidLv * parseInt(subValue.component_qty))
                ZBO1useMat.push(subValue)
            })
            await Promise.all(promSubMap)
        }
    })
    await Promise.all(promMap1)
    console.log('ZBO1useMat', ZBO1useMat)

    const promMap2 = ZBO1useMat.map(async (value, index) => {
        const stockList = await seviceGetStockList(value.component_article_no, date)
        if (index === 2) {
            console.log(stockList, stockList.length)
        }
    })
    await Promise.all(promMap2)


    return articleNo
}

const sumStock = async (articleNo) => {
    const materialList = await getMaterialsList(articleNo)
    return resolve(materialList)
}

const caseZBO1 = async (List) => {
    const materialList = await getMaterialsList(articleNo)
    return resolve(materialList)
}
const caseZNM1 = async () => {

    return listArticle
}

const mainStock = async (aritcleNo, date) => {
    const articleType = await getArticleType(aritcleNo)
    console.log('articleType', articleType)
    if (articleType === 'ZBO2') {
        const aa = await caseZBO2(aritcleNo, date)
    }
    else if (articleType === 'ZBO1') {

    }
    else if (articleType === 'ZNM1') {

    }
    else {

    }
    return articleType
}

export default {
    seviceGetStockList,
    getListArticleIAM,
    mainStock
}