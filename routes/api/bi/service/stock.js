import { sequelizePostgres, pool, sequelize } from '../../../../utils'
import config from '../../../../config/config'
import moment from 'moment'
import fs, { copyFileSync } from 'fs'
import { POINT_CONVERSION_COMPRESSED, WSAESOCKTNOSUPPORT } from 'constants';
// import { pool } from '../../../../utils'
const branchList = config.branch
const slocKeyList = config.slocKey
const outputTemplate = config.outputStock

const getListArticleIAM = async () => {
    const query = 'select * from sap_mara order by article_no ASC LIMIT 2'
    const listArticle = await sequelizePostgres.query(query, { type: sequelizePostgres.QueryTypes.SELECT })

    return listArticle
}


const seviceGetStockList = async (articleNo, date, branch, slocKey) => {
    const NewarticleNo = (articleNo ? articleNo : '')
    const NewDate = (date ? date : '')
    // console.log(NewarticleNo, NewDate, branch, slocKey)
    const queryStr = `SELECT TOP (1000) [DATE_KEY]
    ,[PLANT_KEY]
    ,[SLOC_KEY]
    ,[ITEM_KEY]
    ,[UNITS_ON_HAND_SAP]
    ,[TOT_STOCK_VAL_SAP]
FROM [PRD_ILMDW_SYBASE].[dbo].[M_STOCK_DAILY] 
where DATE_KEY = '${NewDate}' and ITEM_KEY = '${NewarticleNo}' and PLANT_KEY = '${branch}' and SLOC_KEY = '${slocKey}'`

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

const getZBO1useMat = async (ZBO2useMat) => {
    const output = []
    if (ZBO2useMat.length === 0) {
        console.log('case false ')
        return false
    }
    const promMap1 = ZBO2useMat.map(async (value, index) => {
        const findMatLastLv = await getMaterialsList(value.component_article_no)
        const qtyMidLv = parseInt(value.component_qty)
        if (findMatLastLv.length === 0) {
            // console.log('case 0 ', qtyMidLv, value.component_qty)
            value.netQty = value.component_qty
            output.push(value)
        }
        else {
            const promSubMap = findMatLastLv.map((subValue, subIndex) => {
                // console.log('case 1 ', qtyMidLv, subValue.component_qty)
                subValue.netQty = String(qtyMidLv * parseInt(subValue.component_qty))
                output.push(subValue)
            })
            await Promise.all(promSubMap)
        }
    })
    await Promise.all(promMap1)
    // console.log('ZBO1useMat', output)
    return output
}

const getComponentStock = async (ZBO1useMat, date) => {

    const output = []
    const promMap2 = ZBO1useMat.map(async (value1, index1) => {

        const tmpObj = {}
        tmpObj.articleComponentNo = value1.component_article_no

        const promMapBranch = branchList.map(async (valueBranch, indexBranch) => {

            tmpObj.stock = []
            const objStock = {}
            objStock.plant = valueBranch


            const promMapSlocKey = slocKeyList.map(async (valueSlocKey, indexSlocKey) => {

                const stockList = await seviceGetStockList(value1.component_article_no, date, valueBranch, valueSlocKey)
                if (indexSlocKey === 0) {
                    if (stockList.length > 0) {
                        objStock.sloc001 = stockList[0].UNITS_ON_HAND_SAP
                    }
                    else { objStock.sloc001 = 0 }
                }
                else if (indexSlocKey === 1) {
                    if (stockList.length > 0) {
                        objStock.sloc002 = stockList[0].UNITS_ON_HAND_SAP
                    }
                    else { objStock.sloc002 = 0 }
                }
                else if (indexSlocKey === 2) {
                    if (stockList.length > 0) {
                        objStock.sloc003 = stockList[0].UNITS_ON_HAND_SAP
                    }
                    else { objStock.sloc003 = 0 }
                }
                else if (indexSlocKey === 3) {
                    if (stockList.length > 0) {
                        objStock.sloc004 = stockList[0].UNITS_ON_HAND_SAP

                    }
                    else { objStock.sloc004 = 0 }

                    tmpObj.stock.push(objStock)
                }
            })

            await Promise.all(promMapSlocKey)
        })

        await Promise.all(promMapBranch)

        output.push(tmpObj)


    })
    await Promise.all(promMap2)
    return output
}

const caseZBO2 = async (articleNo, date) => {
    const ZBO2useMat = await getMaterialsList(articleNo)
    console.log('ZBO2useMat', ZBO2useMat)
    const ZBO1useMat = await getZBO1useMat(ZBO2useMat)
    console.log('ZBO1useMat', ZBO1useMat)
    const componentStock = await getComponentStock(ZBO1useMat, date)

    fs.writeFileSync("componentStock.json", JSON.stringify(componentStock))

    const totalDivideQty = await findTotalStockByQty(ZBO1useMat, componentStock)
    fs.writeFileSync("totalDivideQty.json", JSON.stringify(totalDivideQty))

    const VarBeforeFindMinQty = await buildVarBeforeFindMinQty(ZBO1useMat, totalDivideQty)
    fs.writeFileSync("VarBeforeFindMinQty.json", JSON.stringify(VarBeforeFindMinQty))

    const listMinStock = await findMin(VarBeforeFindMinQty)
    fs.writeFileSync("listMinStock.json", JSON.stringify(listMinStock))

    return listMinStock
}

const findMin = async (inputList) => {
    const outputList = []
    const promMap = inputList.map((value, index) => {
        // value.plant
        const obj = {}
        obj.plant = value.plant
        obj.sloc001 = Math.min.apply(null, value.sloc001)
        obj.sloc002 = Math.min.apply(null, value.sloc002)
        obj.sloc003 = Math.min.apply(null, value.sloc003)
        obj.sloc004 = Math.min.apply(null, value.sloc004)
        // console.log(value.sloc001, Math.min.apply(null, value.sloc001))
        // value.sloc001 = th.min.apply(null, value.sloc001)
        outputList.push(obj)
    })
    await Promise.all(promMap)
    // console.log(outputList)
    return outputList
}

const buildVarBeforeFindMinQty = async (ZBO1useMat, totalDivideQty) => {
    const listOut = outputTemplate
    const objOut = {}
    const promMap = ZBO1useMat.map(async (value1, index1) => {

        // objOut.plant = []

        const resultSearchObject = searchByArticle(value1.component_article_no, totalDivideQty)


        const promMap2 = branchList.map(async (value2, index2) => {


            const resultSearchObjectByPlant = searchByPlant(value2, resultSearchObject.stock)

            const objIndex = listOut.findIndex((obj => obj.plant == value2))
            listOut[objIndex].sloc001.push(resultSearchObjectByPlant.sloc001)
            listOut[objIndex].sloc002.push(resultSearchObjectByPlant.sloc002)
            listOut[objIndex].sloc003.push(resultSearchObjectByPlant.sloc003)
            listOut[objIndex].sloc004.push(resultSearchObjectByPlant.sloc004)
        })
        await Promise.all(promMap2)
        // console.log(listOut)
    })
    await Promise.all(promMap)

    return listOut
}

const findTotalStockByQty = async (ZBO1useMat, componentStock) => {

    // ZBO1useMat[0].netQty = '3'
    const stockDivideQtyUseMat = []

    const promMap = ZBO1useMat.map(async (value1, index1) => {
        const objSubDivideQtyUseMat = {}
        objSubDivideQtyUseMat.articleComponentNo = value1.component_article_no
        objSubDivideQtyUseMat.stock = []
        // console.log(value1.component_article_no, value1.netQty)
        const resultSearchObject = searchByArticle(value1.component_article_no, componentStock)
        // console.log(resultSearchObject)
        const promMap2 = resultSearchObject.stock.map(async (value2, index2) => {
            value2.sloc001 = Math.floor(Number(value2.sloc001) / Number(value1.netQty))
            value2.sloc002 = Math.floor(Number(value2.sloc002) / Number(value1.netQty))
            value2.sloc003 = Math.floor(Number(value2.sloc003) / Number(value1.netQty))
            value2.sloc004 = Math.floor(Number(value2.sloc004) / Number(value1.netQty))

            objSubDivideQtyUseMat.stock.push(value2)
        })
        await Promise.all(promMap2)
        // console.log('round down',objSubDivideQtyUseMat)
        stockDivideQtyUseMat.push(objSubDivideQtyUseMat)
    })
    await Promise.all(promMap)

    // console.log('stockDivideQtyUseMat',stockDivideQtyUseMat)
    return stockDivideQtyUseMat
}


function searchByArticle(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].articleComponentNo === nameKey) {
            return myArray[i];
        }
    }
}

function searchByPlant(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].plant === nameKey) {
            return myArray[i];
        }
    }
}

const caseZBO1 = async (List) => {
    const materialList = await getMaterialsList(articleNo)
    return resolve(materialList)
}
const caseZNM1 = async () => {

    return listArticle
}

const mainStock = async (aritcleNo, date) => {
    if (fs.existsSync('componentStock.json')) {
        fs.unlinkSync('componentStock.json')
    }
    if (fs.existsSync('totalDivideQty.json')) {
        fs.unlinkSync('totalDivideQty.json')
    }
    if (fs.existsSync('VarBeforeFindMinQty.json')) {
        fs.unlinkSync('VarBeforeFindMinQty.json')
    }


    const articleType = await getArticleType(aritcleNo)
    console.log('articleType', articleType)
    if (articleType === 'ZBO2') {
        const output = await caseZBO2(aritcleNo, date)
        return output
    }
    else if (articleType === 'ZBO1') {
        const output = await caseZBO2(aritcleNo, date)
        return output
    }
    else if (articleType === 'ZNM1') {
        const output = []
        return output
    }
    else {
        const output = []
        return output
    }

}

export default {
    seviceGetStockList,
    getListArticleIAM,
    mainStock
}