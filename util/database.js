const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://csuarezuk83:Colombia83!@trainingmongodb1505.uoxtv6j.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = runServer = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db();
    console.log(client);
  } catch (error) {
    console.log(error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

// testing

runServer().catch(console.dir);
