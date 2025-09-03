const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allCharts = [
    {
  from: "neha",
  to: "priya",
  msg: "send me your exam sheets",
  created_at: new Date() // UTC format
},
{
  from: "priya",
  to: "neha",
  msg: "Sure, I'll send them by tonight.",
  created_at: new Date()
},
{
  from: "neha",
  to: "priya",
  msg: "Thanks! Let me know if you need help with any questions.",
  created_at: new Date()
},
{
  from: "priya",
  to: "neha",
  msg: "Will do! Appreciate it.",
  created_at: new Date("2025-08-09T15:07:00Z")
}];

// Chat.insertMany([
//     {
//     from:"neha",
//     to:"priya",
//     msg:"send me your exam sheets",
//     created_at:new Date() //UTC format in time
// }
// ]);

Chat.insertMany(allCharts);


// let chat1 = new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"send me your exam sheets",
//     created_at:new Date() //UTC format in time
// })

// chat1.save().then((res)=>{
//     console.log(res);
// });
