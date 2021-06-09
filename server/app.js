require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");  
var cors = require('cors')
const fetch = require('node-fetch');


const app = express();
app.use(express.urlencoded({extended: true}));


app.use(cors())
 
mongoose.connect(process.env.DB, {useNewUrlParser: true,useUnifiedTopology: true});

mongoose.set("useCreateIndex", true);




const db = mongoose.connection;
if(db){
   console.log("db connected");
} else {
   console.log("Db Not connected");
}


const todoSchema = new mongoose.Schema({
   id : {
      type:Number,
      unique: true
   } ,
   userId :{
      type: Number,
     },
   title:String,
   completed : Boolean
})


const Todos = new mongoose.model("Todos", todoSchema);
module.exports = Todos;



app.get("/remove", async function(req,res){

 const remove = await Todos.remove({});

res.send("delete  page ");
})





app.get("/data",async function(req,res){

   const data = await fetch('https://jsonplaceholder.typicode.com/todos')
   .then( function(response){
    return response.json(); 
   })
   let todo;
 data.forEach(element => {
     todo = new Todos(element).save();
 });

   
res.json("Adding api data to database ");
})





app.get("/todos",async function(req,res){

   const size = 10;
   const page = parseInt(req.query.page || "0");
   const total = await Todos.countDocuments({});

   const posts = await Todos.find({}).limit(size).skip(size * page);

   res.json({
      totalPages : Math.ceil(total/size),
      posts
   })
})









app.listen(process.env.PORT || 4000, function() {
     console.log("Server started on port",process.env.PORT);
  });