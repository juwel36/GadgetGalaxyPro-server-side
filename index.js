const express = require('express')
const cors= require('cors')
const app = express()
const port =  process.env.PORT || 5000

// middileware
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://GadgetGalaxyPro:JYpW6gd5BRQHTjGi@cluster0.9ofe0jv.mongodb.net/?retryWrites=true&w=majority";

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

    const gadgetcollection =client.db("GadgetDB").collection("products")



    // read
app.get('/products',async(req,res)=>{
  const cursor= gadgetcollection.find()
  const result= await cursor.toArray()
  res.send(result)
  })

// create
app.post('/products',async(req,res)=>{
  const user=req.body;
  const result = await gadgetcollection.insertOne(user);
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



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})