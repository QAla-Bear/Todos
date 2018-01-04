const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'andrew', age: 25};
var {name} = user;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to Mongo server.');
  }

  console.log('Connected to Mongo server.');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do.',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo.');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Matthias',
  //   age: 31,
  //   location: 'Stralsund'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert user.');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
