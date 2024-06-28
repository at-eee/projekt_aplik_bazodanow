import { Router } from 'express';
import { sendInfoAboutLoginResult, registerNewUser, loggingOut } from '../controllers/loginController.mjs';
import { displayLoginForm, displayRegisterForm } from '../controllers/formsController.mjs';
import passport from 'passport';

export const loginRoutes = new Router();

//checkes whether the user is already logged in (useful for not allowing user to enter the login again).
function checkAlreadyLogged(req, res, next){

    if(req.isAuthenticated()){
        res.status(409).json({ message: 'User already logged in so can\'t perform this action. Conflict!!!' });
    }else{
        next();
    }

}

//Login
loginRoutes.get('/', checkAlreadyLogged, (req, res) => {
    displayLoginForm(res, null);
});
loginRoutes.post('/', checkAlreadyLogged, passport.authenticate('local'), sendInfoAboutLoginResult);

//Register
loginRoutes.get('/register', checkAlreadyLogged, (req, res) => {
    displayRegisterForm(res, null);
});
loginRoutes.post('/register', checkAlreadyLogged, registerNewUser);
 
//Logout
loginRoutes.delete('/logout', loggingOut);
