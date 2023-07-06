require('dotenv').config()
const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;



const hashPassword = async (password) => { 
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                
                resolve({hash, salt })
            });
        });
     })
    
}

const generateOtp = (num) => {
    if (num < 2) {
        return Math.floor(1000 + Math.random() * 9000)
    }
    const c = Math.pow(10, num - 1)
    
    return Math.floor(c + Math.random() * 9 * c)

}

const checkOtpExpiration = (registrationDate) => {
    const timeDifference = new Date() - new Date(registrationDate)
    const timeDifferenceInMinutes = Math.ceil(timeDifference / (1000 * 60))
    return timeDifferenceInMinutes
}

const bankList = () => {
    return axios({
        method: 'get',
        url: 'https://api.paystack.co/bank',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    })
}

const accountResolver = (account_number,bank_code) => {
    return axios({
        method: 'get',
        url: `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
            }
            
    })
}

module.exports = {
    hashPassword,
    generateOtp,
    checkOtpExpiration,
    bankList,
    accountResolver
}