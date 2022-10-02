const { urlencoded } = require("express")
const mongoose = require("mongoose")
const password = "jenish"
const username = "crypto"
const dbname = "crypto"



const url = "mongodb://localhost:27017/crypto"

const conn = mongoose.connect(url,    
    ).catch((err)=>console.log("Err",err))

module.exports = conn




