const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors') 
dotenv.config()


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()

const port = 3000 
app.use(cors())
app.use(bodyparser.json())



client.connect();
const db = client.db(dbName);

console.log(process.env.MONGO_URI) // remove this after you've confirmed it is working


// Get all the passwords
app.get('/',async(req,res)=>{
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save a password
app.post('/',async(req,res)=>{
    const passsword = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(passsword)
    res.send({success: true, result: findResult})
})


//Delete a password
app.delete('/',async(req,res)=>{
    const passsword = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(passsword)
    res.send({success: true, result: findResult})
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})