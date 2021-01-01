const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger')
const memebers = require('./Members')

const app = express();

//Init middleware
// app.use(logger)

//handlebars-middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepage route
app.get('/', (req,res)=> res.render('index', {
    title: 'Member app',
    memebers
}));


//set a static folder

app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'))

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server started on port properly ' + PORT));
