const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use((req, res, next)=>{
console.log('Custom Logger: ${req.method} ${req.url}');
next()});

app.get ('/', (req, res)=>{
    res.send('Welcome to my server');
});

const PORT =3000;
app.listen (PORT, ()=> {
    console.log('Server is running on http:localhost: ${PORT}');
});
