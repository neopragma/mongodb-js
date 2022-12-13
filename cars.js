const mongodb = require('mongodb');
const uri = "mongodb://localhost:27017/test";
const client = mongodb.MongoClient;
const database = "test";
var filterDoc = null;

async function main() {
  filterDoc = process.argv[2] ? JSON.parse(process.argv[2]) : {}
    callingAllCars();
}

function callingAllCars() {
    client.connect(uri, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(database);
        db.collection('cars').find(filterDoc).toArray().then((docs) => {
            console.log(docs);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            client.close();
        });   
    });      
};

main().catch(console.error);