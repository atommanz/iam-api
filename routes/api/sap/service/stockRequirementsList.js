import { invokeRFC } from '../../../../rfc'

export const callBapi_MD_STOCK_REQUIREMENTS_LIST_API = (articleNo, siteCode) => new Promise(async (resolve, reject) => {
  console.log('xxx', articleNo, siteCode)
  const inp = {
    // PLSCN: '000',
    MATNR: (articleNo ? articleNo.padStart(18, '0') : '000000000110000539'),
    WERKS: (siteCode ? siteCode : '1100'),
    // BERID:'',
    // ERGBZ:'',
    // AFIBZ:'',
    // INPER:'',
    // DISPLAY_LIST_MDPSX:'',
    // DISPLAY_LIST_MDEZX:'',
    // DISPLAY_LIST_MDSUX:'',
    // NOBUF:'',
    // PLAUF:'',
    // I_VRFWE:'',
    // // IS_SFILT:'',
    // // IS_AFILT:'',
    // IV_FILL_MDSTA: 'X',
  }
  try {
    invokeRFC('MD_STOCK_REQUIREMENTS_LIST_API', inp)
      .then(async (out) => {
        // console.log('out BAPI', out.MDEZX)
        // console.log('invokeRFC completed', out)
        // const writeStream = fs.createWriteStream('out.json')
        // writeStream.write(JSON.stringify(out))
        // writeStream.end()
        if (!out) throw new Error('RFC not responding')
        // else if (out.RETURN.CODE.length > 0) throw new Error(`${out.RETURN.CODE}: ${out.RETURN.MESSAGE}`)
        else {
          // console.log('success')
          // console.log('resp key', out)
          // fs.writeFileSync('./simulate_raw_out.json', JSON.stringify(out), 'utf-8')
          // const transformed = await transformSapData(out)
          // fs.writeFileSync('./simulate_out.json', JSON.stringify(transformed), 'utf-8')
          resolve(out.MDEZX)
        }
      }).catch(e => reject(e))
    // }).catch(e => console.log('error', e))
  } catch (e) {
    console.log(e, '..')
  }
})
