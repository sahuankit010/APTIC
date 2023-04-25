const mongoose = require('mongoose')

const url = 'mongodb+srv://wpladmin:wpladmin@cluster0.tvja9x7.mongodb.net/wpl_airbnb?retryWrites=true&w=majority';

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