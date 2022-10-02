const express = require("express");
const conn = require("./database/conn")
const Model = require("./database/schema")
const axios = require("axios");
const app = express()
const cron = require('node-cron');
const CryptoPrice = require("./database/cryptoPrice")


const API = "SBZUF8VQHNAEJSQ4ZASDD449U91J5YX6V6"
const address = "0xCE94E5621a5F7068253c42558C147480f38b5e0D"

app.use(express.json())


// Task 1 
app.get("/", async (req,res) => {
    const data = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${API}`)
    const result = data.data.result;
    console.log(result)
    const model = await Model.insertMany(result)
    res.send("Hello world")
    
});

//Task 2 

cron.schedule('*/10 * * * *', async () => {
    console.log("Data has been changed")
    const data = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr")
    const price = await CryptoPrice.findByIdAndUpdate(
        {_id:"633963f02d173ce07cd5947c"},{currentPrice:data.data.ethereum.inr})
    console.log(price)
  });

// Task 3

app.get("/input/:address",async(req,res) => {
    let priceToData = 0
    let priceFromData = 0
    const fromdata = await Model.find(
        {
            from:req.params.address
        }
    )
    const todata = await Model.find(
        {
            to:req.params.address
        }
    )
    for(const value in todata){
        priceToData+=parseInt(todata[value].value)
    }
    for(const value in fromdata){
        priceFromData+=parseInt(fromdata[value].value)
    }
    console.log(priceFromData)
    console.log(priceToData)
    const currentPrice = await CryptoPrice.findById({_id:"633963f02d173ce07cd5947c"}).select('currentPrice')
    const dataObj = {
        address:req.params.address,
        cryptoPrice:currentPrice.currentPrice,
        balance : priceToData - priceFromData
    }
    res.send(dataObj)
})

app.listen(8000,"localhost",(req,res)=>console.log("Server is Running on port no 8000"))

