// const  mongoose =require('mongoose');

// Map global promises
// mongoose.Promise = global.Promise;

// Mongoose connect
// mongoose.connect('mongodb+srv://duenfin:just4me234@cluster0.lepkk.mongodb.net/2012-election?retryWrites=true&w=majority')

// .then( () => console.log('MongoDB is connected'))
// .catch(err => console.log(err));

// const mongoose = require('mongoose');
// const connectDB = async() =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log(`Mongo DB is connected: ${conn.connection.host}`);
//     }catch (err){
//         console.log(err);
//         process.exit(1)
//     }
// }

// module.exports = connectDB