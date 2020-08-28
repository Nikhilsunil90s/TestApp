const app = require('express')();
const path  = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const getRoutes = require('./routes/getRoutes');
app.use('/', getRoutes);

app.listen(port, () => {
    console.log('App is Running on ' + port );
  });

