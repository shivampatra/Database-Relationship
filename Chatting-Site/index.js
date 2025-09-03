const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js");
const ExpressError = require("./ExpressError.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// getting-started.js
const mongoose = require('mongoose');

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route

app.get("/chats",async (req,res)=>{ //As its a await so it only be used under async keyword 
    try{
        let chats = await Chat.find(); //take data from database so its a asynchronous function.
    //as it is a asynchronous function so it will return promise , so we have to await for this function.
    // console.log(chats);
    res.render("index.ejs",{chats});
    }catch(err){
        next(err);
    }
});

//New Route
app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs");
});

//Create Route
// app.post("/chats",(req,res)=>{
//     let {from,to,msg} = req.body;
//     let newChat = new Chat({
//         from:from,
//         to:to,
//         msg:msg,
//         created_at:new Date()
//     });
//     // console.log(newChat);
//     newChat.save().then((res)=>{console.log("chat was saved")}).catch((err)=>{console.log(err)});
//     res.redirect("/chats");
// });
 app.post("/chats",async (req,res,next)=>{
    // console.log(req);
    try{
        let {from,to,msg} = req.body;
        let newChat = new Chat({
            from:from,
            to:to,
            msg:msg,
            created_at:new Date()
        });
        await newChat.save();
        res.redirect("/chats");
    }catch(err){
        next(err);
    }    
 });



//NEW - Show Route
app.get("/chats/:id",async (req,res,next)=>{
try{
        let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
    //     // throw new ExpressError(404,"Chat not found"); //Asynchronous function doesn't call next() automatically in throw new ExpressError....
        return next(new ExpressError(404,"Chat not found"));
    }
    res.render("edit.ejs",{chat});
}catch(err){
    next(err);
}
});

//Edit Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

//Update ROute
app.put("/chats/:id", async (req,res)=>{

    try{
        let {id} = req.params;
            let {msg:newMsg} = req.body;
            let updatedChat = await Chat.findByIdAndUpdate(
                id,
                {msg:newMsg},
                {runValidators:true, new:true});

            console.log(updatedChat);
            res.redirect("/chats");
    }catch(err){
        next(err);
    }
   
});

//Destroy Route

app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await  Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});


app.get("/",(req,res)=>{
    res.send("root is working");
});


//ERROR handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="Some Error Occured"} = err;
    res.status(status).send(message);
});

app.listen(8080,()=>{
    console.log("Server is listening on port 8080");
});