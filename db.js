const mongoose= require("mongoose");
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const user = new schema({
 name: String,
 email: { type : String, unique : true}, 
 password: String
});

const todo = new schema ({
 userid : ObjectId,
 title: String,
 done: Boolean

})

const UserModel = mongoose.model("users" , user);
const TodoModel = mongoose.model("todos", todo);

module.exports = {
    UserModel,
    TodoModel
}