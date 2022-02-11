const  mongoose =require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect('mongodb+srv://duenfin:just4me234@cluster0.lepkk.mongodb.net/2012-election?retryWrites=true&w=majority')

.then( () => console.log('MongoDB is connected'))
.catch(err => console.log(err));