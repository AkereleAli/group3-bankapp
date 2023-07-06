const joi = require('joi')



const validateBank = (bankData) => {
    const bankSchema = joi.object({
        account_number: joi.number().required(),
        bank_code: joi.number().required()
        
    })
    return bankSchema.validate(bankData)
}

module.exports = validateBank