const express = require('express')
const router = express.Router()
const {deleteBank, getbanksList, resolveAccount, createAccount, userBankAccounts} = require('../controllers/bankControllers')



router.delete('/deletebank/:user_id/:bank_id', deleteBank)
router.get('/getBanks', getbanksList)
router.get('/getAccountName', resolveAccount)
router.post('/bankAccount/:user_id', createAccount)
router.get('/getAccounts/:user_id', userBankAccounts)



module.exports = router