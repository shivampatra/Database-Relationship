const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username:String,
    email:String
});

const postSchema = new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

// const addData = async () =>{
//     // let user1 = new User({
//     //     username:"rahulkumar",
//     //     email:"rahul@gmail.com"
//     // });

//     let user = await User.findOne({username:"rahulkumar"});

//     let post1 = new Post({
//         content:"Hello World",
//         likes:7
//     });

    
//     let post2 = new Post({
//         content:"Bye Bye",
//         likes:7
//     });

//     post2.user = user;

//     // await user1.save();
//     await post2.save();
// };

// addData();

const rrr = async () => {
    // let results = await Post.find({}).populate("user");
    let results = await Post.find({}).populate("user","username");
console.log(results);
}

rrr();