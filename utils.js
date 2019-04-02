
import sql from 'mssql'
import dotenv from 'dotenv'
import config from 'config'

dotenv.config()

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  AD_PASSWORD,
  AD_USERNAME,
  AD_BASE,
  AD_URL,
} = config.get('bi')


const dbconfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_HOST,
  database: DB_DATABASE,
  pool: {
    max: 50,
    min: 1,
    idle: 20000,
    evict: 20000,
    acquire: 20000,
  },
}
console.log(dbconfig)
const connectionPool = new sql.ConnectionPool(dbconfig)

const configMap = {}

export const getConfigMap = async (key, alias = '*', reload = false) => {
  if (!configMap.hasOwnProperty(key) || reload) {
    try {
      console.log('initialize configmap key=>', key)
      const result = await connectionPool.request()
        .query(`select ${alias} from ${key}`)
      configMap[key] = result.recordset
      // console.log('finished ', configMap[key])
    } catch (err) {
      /* istanbul ignore next */
      console.error('get configmap error ', err)
      return []
    }
  }
  return configMap[key]
}

export const errorMessage = (message, status = 500, stacktrace) => {
  const err = new Error()
  err.message = message
  err.status = status
  err.stacktrace = stacktrace
  return err
}
export const pool = connectionPool
