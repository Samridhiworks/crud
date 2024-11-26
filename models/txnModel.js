const mongoose = require('mongoose');

const txnSchema = new mongoose.Schema({
    txn_id:{
      type:String,
      required:true
    },
    amount:{
      type:Number,
      required:true
    },
    pg_method:{
      type:String,
      required:true
    },
    bank_name:{
      type:String,
      required:true
    },
    user:{
      type:String,
      required:true,
    },
    date:{
      type:String,
      required:true
    }
},{timestamps:true})


//dates are ma
//created and updated are of presnt and future

module.exports = mongoose.model("Txn", txnSchema)


//TS
//Strict js
//strict mod
