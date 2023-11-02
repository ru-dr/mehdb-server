const mongoose = require('mongoose');

const uri = "mongodb+srv://Rudra:Rudra_2674@cluster0.waeohei.mongodb.net/?retryWrites=true&w=majority"

const connection = ()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', ()=>{
        console.log('Connected to MongoDB');
    });
    return db;
}

module.exports = connection;