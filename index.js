const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const {UserModel ,TodoModel} = require("./db"); 
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET = "kavish";
mongoose.connect("mongodb+srv://admin:Jco7vnzvcORtrrsL@cluster0.zz2sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/kavish-todo");

app.use(express.json());
app.post("/signup" , async function(req,res){
  const email =  req.body.email;
  const password = req.body.password;
  const name = req.body.email;

 await UserModel.create({
   name :name,
   email: email,
   password: password
     
})

res.json({
    message : "you are logged in"
})

})

app.post("/login" , async function(req,res){
  const email = req.body.email;
  const password = req.body.password;
  
   const user =  await UserModel.findOne({
    email:email,
    password: password
   })

   if(user){
         const token = jwt.sign({
          id : user._id.toString()
         }, JWT_SECRET);
         res.json({
             token:token
         })

   }
   else{
      res.status(403).json({
        message: "incoreect details"
      })
   }

    
})

app.post("/todo" ,auth, async function(req,res){
  const userid = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
      userId,
      title,
      done
  });

  res.json({
      message: "Todo created"
  })
})

app.get("/todos" ,auth, async function(req,res){
  const userid = req.userId; 
  const todos = await TodoModel.find({
    userId
});

res.json({
    todos
})
    
})

function auth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
      req.userId = token.Id;
      next();
  } else {
      res.status(403).json({
          message: "Incorrect creds"
      })
  }
}

app.listen(3000);
