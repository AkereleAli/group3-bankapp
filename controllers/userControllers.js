const sequelize = require('../config/db');
const { registerMessage, userExists, loginMessage, invalidOtp } = require('../constants/messsages')
const {Sequelize, Op} = require('sequelize');
const validateUsers = require('../validations/usersValidation');
const usersModel = require('../models/usersModel');
const otpModel = require('../models/otpModel')
const {OtpEnum} = require('../constants/Enums');
const {hashPassword, generateOtp, checkOtpExpiration} = require('../Utils/helpers');
const { v4: uuidv4 } = require('uuid');
const { sendSms } = require('../services/sms');
const { sendEmail } = require('../services/email');



const registerUser = async(req, res) => {
    const { error } = validateUsers(req.body)
    if (error !== undefined) {
        res.status(400).json({
            status: true,
            message: error.details[0].message || "Bad request"
        })
        return
    }

    const { surname, othernames, gender, phone,  dob, email, password } = req.body
        const checkIfUserExist = await usersModel.findAll({
                                     attributes: ['email', 'phone'],
                                     where: {
                                         [Op.or]: [
                                             { email: email },
                                             { phone: phone }
                                         ]
                                     }
        });

        if(checkIfUserExist.length > 0) {
            res.status(400).json({
                status: false,
                message: userExists
            })
            return
        }

        const { hash, salt } = await hashPassword(password)
        
        await usersModel.create({
            user_id: uuidv4(),
            surname: surname,
            othernames: othernames,
            gender: gender,
            phone: phone,
            dob: dob,
            email: email,
            password_hash: hash,
            password_salt : salt
            

        })
        const _otp = generateOtp(6)
        const dataToInsert = {
            otp_id: uuidv4(),
            email_or_phone: email,
            otp: _otp //our magical otp generator
        }
        console.log(_otp)
        await otpModel.create(dataToInsert)

        //send as sms
        //send as email
        //sendEmail(email, "OTP", `Hi ${surname}, your otp is ${_otp}`)


        res.status(201).json({
            status: true,
            message: registerMessage
        })

    try{

    } catch(error) {
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}


const verifyUser = async (req, res) => { 

    const { otp, email } = req.params
    if (!otp || !email) { 
        res.status(400).json({
            status: false,
            message: "Bad request"
        })
        return
    }
    try {
        
        const otpData = await otpModel.findOne({
            where: {
                email_or_phone: email,
                otp: otp,
                otp_type: OtpEnum.REGISTRATION
            }
        })
        if (!otpData) { 
            res.status(400).json({
                status: false,
                message: invalidOtp
            })
            return
        }
    //check if otp has expired
        const user = await usersModel.findOne({
            attributes: ['createdAt'],
            
                where: {
                   email: email
                }
        })
        //console.log(user.createdAt)
        const isOtpExpired = checkOtpExpiration(user.createdAt)
        console.log(isOtpExpired)
        if (isOtpExpired > 250) {
            res.status(400).json({
                status: false,
                message: 'OTP expired'
            })
            return
        }
        await usersModel.update({
            isOtpVerified: true
        }, {
            where: {
               email: email
            }
        })

        await otpModel.destroy({
            where: {
                email_or_phone: email,
                otp_type: OtpEnum.REGISTRATION
            }
        })

        res.status(200).json({
            status: true,
            message: "Account verified successfully"
        })
        return 
    }catch(error) {
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }


}

const resendOtp = async(req,res) => {
    const { email } = req.body
    if (!email) { 
        res.status(400).json({
            status: false,
            message: "Bad request"
        })
        return
    }

    try{

        const user = await usersModel.findOne({
            where: {
                email: email
            }
        })
        if (!user) { 
            res.status(400).json({
                status: false,
                message: 'Invalid email'
            })
            return
        }
        const _otp = generateOtp(6)
        const dataToInsert = {
            otp_id: uuidv4(),
            email_or_phone: email,
            otp: _otp //our magical otp generator
        }
        console.log(_otp)
        await otpModel.create(dataToInsert)
        //sendEmail(email, 'Resend OTP ', `Hi ${firstname}, Your new OTP is ${otp}. Kindly note that this OTP expires in 5 minutes.`,)
    
    res.status(200).json({
        status: true,
        message: "Otp resent successfully"
    })

    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}

const getUser = async(req, res) => {
    const { email } = req.params
    if (!email) { 
        res.status(400).json({
            status: false,
            message: "Bad request"
        })
        return
    }
    try{
        const user = await usersModel.findOne({
            //attributes: ['createdAt', 'surname'],
            
                where: {
                   email: email
                }
        })
        res.status(201).json({
            status: true,
            data: user
        })
        console.log(user.createdAt)
        return

    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        }) 
    }
}


const updateUserProfile = async(req, res) => {
    const {user_id} = req.params
    if(!user_id){
        return res.status(400).json({
            status: false,
            message: "bad request"
        })
    }
    try{
        await usersModel.update(
            req.body, {
                where: {
                    user_id: user_id
                }
            })

            res.status(200).json({
                status: true,
                message: "Account updated successfully"
            })
            return
    }catch(error){
        res.status(500).json({
            status: false,
            message:  error.message || "Internal server error"
        })
    }
}


const getUserDetails = async(req, res) => {
    const { user_id } = req.params
    if (!user_id) { 
        res.status(400).json({
            status: false,
            message: "Bad request"
        })
        return
    }
   try{
    const user = await usersModel.findOne({
        attributes: ['othernames','surname','email', 'dob', 'marital_status', 'gender', 'phone'],
        where: {
            
            user_id: user_id
        }
    })
    res.status(201).json({
        status: true,
        data: user
    })
    return
   }catch(error){
    res.status(500).json({
        status: false,
        message:  error.message || "Internal server error"
    })
   }
    }


module.exports = {registerUser, verifyUser, getUser, resendOtp, updateUserProfile, getUserDetails}
