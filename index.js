
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors= require('cors')
const app = express()
const port =  process.env.PORT || 5000

// middileware
app.use(cors())
app.use(express.json())


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
// 
// update.1
app.get('/products/:id',async(req,res)=>{
const id = req.params.id
const query = {_id:new ObjectId(id)}
const user=await gadgetcollection.findOne(query)
res.send(user)
})


app.get('/products/brand/:brandname', async (req, res) => {
  const brandname = req.params.brandname;
  const query = { brandname }; 
  const products = await gadgetcollection.find(query).toArray();
  res.send(products);
});

// update
app.put('/products/:id', async(req,res)=>{
const id =req.params.id;
const filter = {_id: new ObjectId(id)}
const options={upsert:true}
const updateuser=req.body;
const user ={
  $set:{
    image:updateuser.image,
    name:updateuser.name,
    brandname:updateuser.brandname,
    product:updateuser.product,
    price:updateuser.price,
    rating:updateuser.rating,
  }
  }
  const result = await gadgetcollection.updateOne(filter,user,options)
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