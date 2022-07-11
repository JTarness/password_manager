//Insert your "secret link" here to access mongodb
const uri = "mongodb+srv://burchy99:%2AJL0hn36%23%2AgC@passmanager.lkwxg.mongodb.net";
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
});

let AccountCreation;
MongoClient.connect(uri)
  .then(client => {
    // ...
    const db = client.db('PassManager')

    AccountInfo = db.collection('UserInformation')
    TestInsert = db.collection('Test1')

    // ...
  })

// For backend and express
const path = require('path');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const local_port = 5000
const express = require('express');
const app = express();
const cors = require("cors");
const colors = require('colors');
const { ObjectId } = require("mongodb");
console.log("App listen at port " + local_port);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));



// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);


app.get("/api/passwords", async (req, resp) => {
    await client.connect();
    const collection = client.db("PassManager").collection("Username/Password");
    const passwords = await collection.find( {accountUsername: "Alexane_Schneider"} ).toArray();
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON.stringify(passwords));
});



app.delete("/api/passwords", async (req, resp) =>{
    let {_id} = req.body;
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("PassManager").collection("Username/Password");
    await collection.deleteOne({_id: ObjectId(_id)})
});

const pushUpdate = async (password) =>{
    let $set  = { ...password };
    delete $set._id;
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("PassManager").collection("Username/Password");
    let result = await collection.updateOne(
        { _id: ObjectId(password._id) },
        {
            $set: $set
        },
        { upsert: true }
    )
}

//Used to update any 
app.post("/api/passwords", req => pushUpdate(req.body) );


app.post("/api/import", async (req, resp) => {
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("PassManager").collection("Username/Password");
    for (let i in req.body){
        await pushUpdate(req.body[i]);
    }
    resp.send({ success: true });
})



app.listen(5000, () => console.log('API is running on http://localhost:5000/login'));
