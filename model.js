const { MongoClient, ConnectionClosedEvent } = require('mongodb')
const { ObjectID } = require('bson')
const { dbConfig } = require("./config")

const client = new MongoClient(dbConfig.url);//connecting server to client

// Database Name
const dbName = dbConfig.db;
// collection name
const dbCollection = dbConfig.collection;

//creating and connecting to database
const connectToDB = async() => {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    console.log('Connected successfully to the DB');
    const collection = db.collection(dbCollection);
    console.log('Connected successfully to the collection');
    return collection;
}

//creating a function to insert
const addTask = async(task) => {
    let collection = await connectToDB()
    const insertResult = await collection.insertOne(task);
    console.log('Inserted documents =>', insertResult);
    if (insertResult.acknowledged === true) {
        return insertResult.insertedId;
    }
    return false;
}
//creating a function to read
const getTask = async() => {
    let collection = await connectToDB();
    const results = await collection.find({}).sort({_id:-1}).toArray();
    return results;
}
//creating a function to delete
const delTask = async(taskId) => {
    let collection = await connectToDB();
    const deleteResult = await collection.deleteOne({_id: new ObjectID(taskId)});
    console.log('Deleted documents =>', deleteResult);
    if (deleteResult.acknowledged === true && deleteResult.deletedCount === 1) {
        return true;
    }
    return false;
}

const editTask=async(taskId, newtask, newtime) => {
    let collection = await connectToDB();
    const editResult = await collection.updateOne({_id: new ObjectID(taskId)},{$set: {task: newtask, time: newtime}});
    console.log('Updated documents =>', editResult);
    if(editResult.acknowledged === true && editResult.matchedCount === 1){
       return true;
    }
    return false;
}

module.exports = {
    addTask,
    getTask,
    delTask,
    editTask,
}