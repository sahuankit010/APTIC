const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/';

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })



    //local address: mongodb://localhost:27017/
    //connect with mongob compass