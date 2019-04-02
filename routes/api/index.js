import express from 'express'
import sap from './sap'
import bi from './bi'

const router = express.Router()
router.use('/sap', sap)
router.use('/bi', bi)

export default router
