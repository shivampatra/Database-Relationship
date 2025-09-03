const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.set("views",path.join(__dirname,"/views"));

// Create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'delta_app',
  password:''
});



// app.get("/",(req,res)=>{
//     let q =  `SELECT COUNT(*) FROM user`;
//     try{
//         connection.query(q,(err,result) => {
//             if (err) throw err;
//     let count = result[0]["COUNT(*)"];
//             // res.send(result[0]["COUNT(*)"]);
//             res.render("home.ejs",{count});
//         });
//     }catch(err){
//         res.send("something error occured!")
//     }
// });

// app.get("/user",(req,res)=>{
//     let q = `SELECT * FROM user`;
//    try{
//         connection.query(q,(err,users) => {
//             if (err) throw err;
// //             // console.log(users[0]);
//             res.render("showUsers.ejs",{users})
//         });
//     }catch(err){
//         res.send("something error occured!")
//     }
// });

// //Edit Route
// app.get("/user/:id/edit/",(req,res)=>{
//     let {id} = req.params;
//     // console.log(id);
//     let q = `SELECT * FROM user WHERE id = '${id}'`;
//     try{
//         connection.query(q,(err,result) => {
//             if (err) throw err;
//             let user = result[0];
//             res.render("edit.ejs",{user});
//         });
//     }catch(err){
//         res.send("something error occured!")
//     }
// });

// //Update 
// app.patch("/user/:id",(req,res)=>{
//     let {id} = req.params;
//     let q = `SELECT * FROM user WHERE id = '${id}'`;
//     let {password:formPass,username:newUsername}=req.body;  
//     // console.log(formPass);
//     // console.log(newUsername);
//     try{
//         connection.query(q,(err,result) => {
//             if (err) throw err;
//             let user = result[0];
//             if(formPass != user.password){
//                 res.send("Wrong Password")
//             }
//             else{
//                 let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
//                 connection.query(q2,(err,result)=>{
//                     if(err) throw err;
//                     // res.send(result);
//                     res.redirect('/user');
//                 });
//             }
//     });
//     }catch(err){
//         console.log(err);
//         res.send("something error occured!")
//     }
// });



app.get("/post",(req,res)=>{
    try{
        let q = `SELECT * FROM user`;
        connection.query(q,(err,users)=>{
            if (err) throw err;
            res.render("post.ejs",{users});
        });

    }catch(err){
        res.send("some error occured !");
    }
})

app.get("/post/:id",(req,res)=>{
    try{
        let {id}=req.params;
        let q = `SELECT * FROM user WHERE id = '${id}'`;
        connection.query(q,(err,user)=>{
            if (err) throw err;
            console.log(user);
            res.render("postuser.ejs",{user : user[0]});
        });
    }catch(err){
        res.send("some error occured!");
    }
});

app.listen("8080",()=>{
    console.log("server is running to port 8080");
});







//Inserting new data
// // let q = "INSERT INTO user (id,username,email,password) VALUES (?, ?, ?, ?)";
// // let user = ["123","123_newUser","abc@gmail.com","abc"];
// let users = [
    //     ["121","123a_newUser","abac@gmail.com","abac"],
    //     ["122","12s3_newUser","sabc@gmail.com","asbc"]
    // ];
    
    
    
// let q = "INSERT INTO user (id,username,email,password,DoB,imageAvatar) VALUES ?";




// let getRandomUser = () => {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//     faker.internet.email(),
//     faker.internet.password(),
//     faker.date.birthdate(),
//     faker.image.avatar(),
//     // faker.date.past(),
//   ];
// };

// let data = [];
// for(let i=1;i<=500;i++){
// data.push(getRandomUser());
// }


// try{
//     connection.query(q,[data],(err,result) =>{
//     if(err) throw err;
//     console.log(result);
//     console.log(result.length);
//     console.log(result[0]);
//     console.log(result[1]);
// });
// }catch(err){
//     console.log(err);
// }
// connection.end();

