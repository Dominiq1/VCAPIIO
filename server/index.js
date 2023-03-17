
// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const colors = require('colors');
// require('dotenv').config();
// const schema = require('./schema/schema')
// const connectDB = require('./config/db');
// const cors = require('cors');


// const port = process.env.PORT || 5000;
// // process.env.PORT || 
// const app = express();


// //Connect to database
// connectDB();
// app.use(cors());

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql : process.env.NODE_ENV ==='development'
// }))

// app.listen(port, console.log(`Server running on port ${port}`));




const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const schema = require('./schema/schema')

require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
//new


const port = process.env.PORT || 5000;

const app = express();
// app.use(express.static('public'));


//Connect to database
connectDB();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production'
}))


app.use(express.static(path.join(__dirname, '..', 'client', 'build')));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  


  //here is the magic

app.get('*', (req, res) => {
  //  res.sendFile(path.resolve(__dirname, '..', 'public','index.html'));
    res.sendFile(path.resolve(__dirname, '..', 'client','build'));
  });
  




app.listen(port, console.log(`Server running on port ${port}`));