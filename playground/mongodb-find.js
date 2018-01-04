const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to Mongo server.');
  }

  console.log('Connected to Mongo server.');
  db.collection('Todos').find().count().then((count) => {
    console.log('Number of Todos:');
    console.log(JSON.stringify(count, undefined, 2));

  }, (err) => {
    console.log('Unable to fetch todos.', err);
  });
  db.close();
});
