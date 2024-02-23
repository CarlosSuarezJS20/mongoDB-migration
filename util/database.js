const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://csuarezuk83:Colombia83!@trainingmongodb1505.uoxtv6j.mongodb.net/shop?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const runServer = async () => {
  try {
    if (!db) {
      await client.connect();
      console.log("client is connected");
      // Send a ping to confirm a successful connection
      db = client.db("shop");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// testing testing !
const getDb = () => {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase first.");
  }
  return db;
};

const closeDataBase = async () => {
  try {
    if (!client) {
      await client.close();
      console.log("Closed the database connection");
    }
  } catch (error) {
    console.error("Error closing the database connection:", error);
  }
};

module.exports = { runServer, getDb, closeDataBase, uri };
