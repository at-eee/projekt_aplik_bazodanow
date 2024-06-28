import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { userSchema } from '../models/schemas/userSchema.mjs';
import {Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';
import { uniqueId } from './controller.mjs';

const User = mongoose.model('User', userSchema);


function initialize(passport){
    const authenticateUser = async (username, password, done) => {

        const user = await User.findOne({username: username});

        if(!user){
            return done(null, false, {message: 'No users with given username!'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message: 'Wrong Password!'})
            }
        }catch(err){
            return done(err);
        }

    }//                                             passwordField = default
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser));
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    });
    passport.deserializeUser(async (id, done) => {
        return done(null, await User.findOne({id: id}))
    });
}

initialize(passport);

export const sendInfoAboutLoginResult = (req, res) => {
    res.status(200).json({ message: 'Login successful for user:', user: req.user });
}

export const registerNewUser = async (req, res) => {
    try{
        if(req.body.username && req.body.email && req.body.password){

            const user = new User({
                id: await uniqueId(User),
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            const validationError = user.validateSync();

            if(validationError){
                throw validationError;
            }

            const hashedPass = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPass;
            await user.save();

            res.status(200).json({ message: 'Register successful for the user:', user: req.user });

        }else{
            res.status(500).json({ message: 'An error has occured - something went wrong during registration of a new user.', error: 'username, email or password field was left empty (they are mandatory)!!!',
                username: req.body.username, email: req.body.email, password: req.body.password,
            });
            //displayRegisterForm(res, "username, email or password field was left empty (they are mandatory)!!!");
        }
    }catch(err){
        res.status(500).json({ message: 'An error has occured - something went wrong during registration of a new user:', error: err.message,
            username: req.body.username, email: req.body.email, password: req.body.password,
        });
        //displayRegisterForm(res, errorHandle(err));
    }
}

export const loggingOut = (req, res) => {
    req.logOut(() => {
        res.status(200).json({ message: 'Successfully logged out the user:', user: req.user });
    });
}