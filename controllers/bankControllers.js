const banksModel = require('../models/banksModel')
const {Sequelize, Op} = require('sequelize')
const { v4: uuidv4 } = require('uuid')
const {bankList, accountResolver} = require('../Utils/helpers')
const validateBank = require('../validations/bankValidation')




const deleteBank = async(req,res)=> {
    const {bank_id, user_id} = req.params
    if(!bank_id || !user_id){
        res.status(400).json({
            status: false,
            message: "bad request"
        })
        return
    }

    try{

        await banksModel.destroy({
            where: {
                bank_id: bank_id,
                user_id: user_id
            }
        })
        res.status(200).json({
            status: true,
            message: "bank deleted successfully"
        })
        return
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}


const getbanksList = async(req, res) => {
    try {
         const allBanks = await bankList()
         res.status(200).json({
             status: true,
             message: "all banks retrieved successfully",
             data: allBanks.data.data
         })
         return
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}

const resolveAccount = async(req, res) => {
    const {error} = validateBank(req.query)
    if (error !== undefined) {
        res.status(400).json({
            status: true,
            message: error.details[0].message || "Bad request"
        })
        return
    }
    const {account_number, bank_code} = req.query
    try{
        const getAccount_name = await accountResolver(account_number, bank_code)
        if(getAccount_name.data.status === true){
            return res.status(200).json({
                status: true,
                message: "account resolved successfully",
                data: getAccount_name.data.data.account_name
            })
        }
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}

const createAccount = async(req, res) => {
    const {user_id} = req.params
    if(!user_id){
        res.status(400).json({
            status: false,
            message: "bad request"
        })
        return
    }
    try{
        const {bank_name, bank_account_number, account_name} = req.body
        await banksModel.create({
            bank_id: uuidv4(),
            user_id: user_id,
            bank_name: bank_name,
            bank_account_number: bank_account_number,
            account_name: account_name
        })
        res.status(200).json({
            status: true,
            message: "account created successfully"
        })
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}


const userBankAccounts = async(req,res) => {
    const {user_id} = req.params
    if(!user_id){
        res.status(400).json({
            status: false,
            message: "bad request"
        })
        return
    }
    try{
        const bankAccounts = await banksModel.findAll({
            where: {
                user_id: user_id
            }
        })
        res.status(201).json({
            status: true,
            data: bankAccounts
        })
        return
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}


module.exports = {deleteBank, getbanksList, resolveAccount, createAccount, userBankAccounts}