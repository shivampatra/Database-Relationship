const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/test");
main()
    .then(()=>{
        console.log("connection successul");
})
    .catch(err=>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

const User = mongoose.model("User",userSchema);

// User.insertMany([
//     {name:"Tony",email:"",age:20},
//     {name:"Peter",email:"a",age:30},
//     {name:"Eve",email:"",age:40},
// ]).then((res)=>{
//     console.log(res);
// });

User.find({age:{$gt:30}})
.then((res)=>{
    // console.log(res[0].name);
    console.log(res[0]);
})
.catch((err) =>{
    console.log(err);
});

// const user1 = new User({
//     name:"Adam",
//     email:"adam123@gmail.com",
//     age:22,
// });

// const user2 = new User({
//     name:"Eve",
//     email:"eve123@gmail.com",
//     age:32,
// });
// // user1.save();

// user2
// .save()
// .then((res) =>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });