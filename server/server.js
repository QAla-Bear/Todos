// libs
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
// db config and connection
var {mongoose} = require('./db/mongoose');

//db models
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  },  (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/%ID%
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404). send({});
  }

  Todo.findById(id).then((todo) => {
    if(todo) {
      res.send(todo);
    } else {
      return res.status(404).send({});
    }
  }, (e) => {
    res.status(400).send({});
  });
});

app.delete('/todos/:id', (req, res) =>  {
  // get the id
  var id = req.params.id;
  // validate the id -> not valid -> return 401
  if(!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({});
    } else {
      return res.status(200).send(doc);
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if(!ObjectID.isValid(id)) {
    return res.status(404).send({});
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.send(400).send();
    }
    res.send({todo});
  }).catch((e) => {
    return res.status(400).send();
  });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});



app.get('/users/me', authenticate, (req, res) => {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    res.send(user);
  }).catch((e) => {
    res.status(401).send({});
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});

module.exports = {app};
