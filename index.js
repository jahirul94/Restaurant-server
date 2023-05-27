const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

// mongo start 


const uri = `mongodb+srv://${process.env.db_USER}:${process.env.db_PASS}@cluster0.kri1sc7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const menuCollection = client.db("restaurantsDb").collection("menu");
        const reviewsCollection = client.db("restaurantsDb").collection("reviews");
     
        app.get("/menu" , async(req , res ) =>{
             const result = await menuCollection.find().toArray();
             res.send(result)
        })

        app.get("/reviews" , async(req , res ) =>{
             const result = await reviewsCollection.find().toArray();
             res.send(result)
        })







        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// mongo end

app.get("/", (req, res) => {
    res.send("restaurants server running")
})

app.listen(port, () => {
    console.log(`restaurants app running on port : ${port}`);
})