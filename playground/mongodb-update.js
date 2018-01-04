const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to Mongo server.');
  }

  console.log('Connected to Mongo server.');

  //delete many
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a3ac9de64a5e9abdd9999e3')
  }, {
    $set: {
      completed: true
      }
    }, {
      returnOriginal: false
  })
  .then((result) => {
    console.log(result);
  });


  //db.close();
});
