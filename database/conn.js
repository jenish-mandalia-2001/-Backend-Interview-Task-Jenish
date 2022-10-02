const { urlencoded } = require("express")
const mongoose = require("mongoose")
const password = "jenish"
const username = "crypto"
const dbname = "crypto"



const url = "mongodb://localhost:27017/crypto"
// const url = `mongodb+srv://${username}:${password}@cluster0.zplu9ss.mongodb.net/${dbname}?retryWrites=true&w=majority`
// const url = "mongodb://localhost:27017"

const conn = mongoose.connect(url,    
    ).catch((err)=>console.log("Err",err))




    // const { MongoClient, ServerApiVersion } = require('mongodb');
    // const uri = "mongodb+srv://crypto:jenish@cluster0.zplu9ss.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });

module.exports = conn




