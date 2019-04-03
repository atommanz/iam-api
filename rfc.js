import config from 'config'
import { Client, Pool } from 'node-rfc'

const abapSystem = config.get('sap-dev')
console.log('abapSystem', abapSystem)
const pool = new Pool(abapSystem)

export const invokeRFC = (BAPI, bapiParams) => new Promise((resolve, reject) => {
  // console.log('pool', pool.status)
  // console.log('atom',BAPI, bapiParams)
  pool.acquire()
    .then((poolClient) => {
      // console.log('call', BAPI,poolClient)
      poolClient
        .call(BAPI, bapiParams)
        .then((rfcResults) => {
          // console.log('res',rfcResults)
          pool.release(poolClient)
          return resolve(rfcResults)
        })
        .catch((err) => {
          console.error('Error invoking STFC_CONNECTION:', BAPI, err)
          pool.release(poolClient)
          return reject(err)
        })
    })
})

export const readTable = async ({ table, fields, options }) => {
  const fieldList = []
  const displayName = []
  for (const key of Object.keys(fields)) {
    fieldList.push({ FIELDNAME: key })
    displayName.push(fields[key])
  }
  // console.log(_fields, _displayName, options)
  const BAPI = 'RFC_READ_TABLE'
  const bapiParams = {
    QUERY_TABLE: table,
    DELIMITER: ',',
    OPTIONS: options,
    FIELDS: fieldList,
  }
  const rfcResults = await invokeRFC(BAPI, bapiParams)
  const data = []
  rfcResults.DATA.map((record) => {
    const raw = record.WA.split(',') // []
    const k = {}
    for (let i = 0; i < displayName.length; i += 1) {
      k[displayName[i]] = raw[i].trim()
    }
    data.push(k)
    return k
  })
  return data
}
