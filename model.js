//creating and connecting to database
function create_connect()
{
    var MongoClient=require('mongodb').MongoClient;
    var url="mongodb://localhost:27017/mydb";
    MongoClient.connect(url, function(err,db){
        if(err)
        throw err;
        console.log("Database created!");
        db.close();
        })
}

/*creating a function to insert
function insert(){
    db.tasks.insertOne([
        {task:tsk,time:tm}

    ])
    function read(){

    }

    function delete(){
        db.tasks.deleteOne({})

    }
    */