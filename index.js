require('dotenv').config();
const express = require('express');
const app = express();
const displayRoutes = require('express-routemap');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = process.env.SERVER_PORT;
const sequelize = require('./config/db');
const userModel = require('./models/usersModel');
const otpModel = require('./models/otpModel');
const bankModel = require('./models/banksModel')
const userRoutes = require('./Routes/usersRoutes');
const bankRoutes = require('./Routes/banksRoutes')


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/bank', bankRoutes)


sequelize.sync()
.then(()=>console.log ('all models synced with database'))

sequelize.authenticate()
  .then(() => {
   console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`app listening at port ${port}`)
      displayRoutes(app);
    })
  })
  .catch(err => console.log('Error: ' + err))



