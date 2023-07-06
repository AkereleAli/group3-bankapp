const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

const Users = sequelize.define('user', {
    sn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    surname:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
   othernames:{
        type: DataTypes.TEXT,
        allowNull: false
    } ,
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    gender:{
        type: DataTypes.ENUM,
        values: ['male', 'female'],
        allowNull: false,
    },
    dob:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    address_number:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    address_street:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    address_city:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    address_state:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    localgovt:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    state_of_origin:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    marital_status:{
        type: DataTypes.ENUM,
        values: ['married', 'single', 'divorced'],
        allowNull: true,
        defaultValue: 'single'
    },
    password_hash:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    password_salt:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nextofkin_surname:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    nextofkin_othernames:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    nextofkin_phone:{
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    nextofkin_relationship:{
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    nextofkin_address_number:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    nextofkin_address_street:{
        type: DataTypes.STRING(70),
        allowNull: true,
    },
    nextofkin_address_city:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    nextofkin_address_state:{
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    bvn:{
        type: DataTypes.STRING(11),
        allowNull: true,
        
    },
  nin:{
        type: DataTypes.STRING(11),
        allowNull: true,
       
    },
  isBvnVerified:{
    type: DataTypes.BOOLEAN,
      allowNull: true,
    defaultValue: false
  },
  isNinVerified:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  isOtpVerified:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  isPasswordChangeRequired:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
});


module.exports = Users;
