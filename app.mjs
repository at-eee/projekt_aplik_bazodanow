import express from 'express';
import {animalRoutes} from './routes/animals.mjs';
import {indexRoutes} from './routes/index.mjs';
import {loginRoutes} from './routes/login.mjs';
import flash from 'express-flash';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import methodOverride from 'method-override';

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();

try{
    await mongoose.connect(DB_URI);
}catch(err){
    console.log(err.message);
}

//HTTP request logging middleware
function logRequest(req, res, next){
    console.log(req.method + '\t' + req.url);
    next();
}

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.json({limit: 10000}));
app.use(logRequest);
app.use(express.urlencoded({extended: true})); //wczesniej false.
app.use(express.static('public')); //static files.
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET, //key for encrypting the information.
    resave: false, //do we want to resave our session variables even if nothing has changed
    saveUninitialized: false //do we want to save empty session values.
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/animals', animalRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => {
    console.log('Listening at http://localhost' + ', port: ' + PORT);
});
