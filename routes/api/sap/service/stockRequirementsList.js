import { invokeRFC } from '../../../../rfc'

export const callBapi_MD_STOCK_REQUIREMENTS_LIST_API = (articleNo, siteCode) => new Promise(async (resolve, reject) => {
  console.log('in bapi MD_STOCK_REQUIREMENTS_LIST_API ', articleNo, siteCode)
  const inp = {
    MATNR: articleNo.padStart(18, '0') ,
    WERKS: (siteCode ? siteCode : '1100'),
  }
  try {
    invokeRFC('MD_STOCK_REQUIREMENTS_LIST_API', inp)
      .then(async (out) => {
        if (!out) throw new Error('RFC not responding')
        else {
          resolve(out.MDEZX)
        }
      }).catch(e => reject(e))
  } catch (e) {
    console.log(e, '..')
  }
})
