const mongoose  = require("mongoose")



const schema = new mongoose.Schema(
    {
        currentPrice:{
            type : String
        }
    }
)
const CryptoPrice = mongoose.model("cryptoprice",schema)

module.exports = CryptoPrice