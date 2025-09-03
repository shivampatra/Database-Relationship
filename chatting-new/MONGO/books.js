const mongoose = require("mongoose");
main()
    .then(()=>{
        console.log("connection successul");
})
    .catch(err=>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20,
    },
    author:{
        type:String
    },
    // Price:Number,//Shortcut
    price:{
        type:Number,
        min:[1,"Price is too low for Amazon selling"]
        // min:1
    },
    discount:{
        type:Number,
        default :0
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"]
    },
    genre:{
        type:[String]
    }
});

const Book = mongoose.model("Book",bookSchema);

Book.findByIdAndUpdate("68974d3d233343570f8a4cd3",{price:-500},{runValidators:true}).then(
    (res) => {
        console.log(res);
    }
).catch((err)=>{
    console.log(err.errors.price.message);
})


// let book1 = new Book({
//     title:"Marvel Comics",
//     author:"Sharma",
//     price:10,
//     category:"fiction",
//     genre:["comics","superheroes","fiction"]

// });


// book1
//     .save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });