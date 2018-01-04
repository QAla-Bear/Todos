const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models.todo');

var id = '5a4d2dce4696148438f93e97';

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});
