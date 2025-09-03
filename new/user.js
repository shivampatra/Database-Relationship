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
    addresses: [
        {
            //mongodb will create automatically _id field for all addresses individual , by default it assumes the schema is written for a valid document.
            //Prevent this making id 
            _id:false,
            location: String,
            city : String,
         },
    ],
});

const User = mongoose.model("User",userSchema);

const addUsers = async () => {
    let user1 = new User({
        username:"MyUsername",
        addresses: [{
            location:"2232 Baker Street",
            city:"London"
        }]
    });

    user1.addresses.push({location:"p32 wallstreet",city:"London"});
    let result = await user1.save();
    console.log(result);
};

addUsers();