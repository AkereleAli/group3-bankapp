const express = require('express')
const router = express.Router()
const {registerUser, verifyUser, getUser, resendOtp, updateUserProfile, getUserDetails} = require('../controllers/userControllers')


router.post('/register', registerUser)
router.get('/getuser/:email', getUser)
router.post('/sendOtp', resendOtp)
router.patch('/verify/:otp/:email', verifyUser)
router.patch('/updateUser/:user_id', updateUserProfile)
router.get('/userProfile/:user_id', getUserDetails)

// router.post('/login', userLogin)


module.exports = router