import { Router } from 'express';

export const indexRoutes = new Router();

indexRoutes.get('/', (req, res) => {
    res.status(200).render('index', {title: 'Homepage', text: ''});
});

indexRoutes.get('/greet', (req, res) => {
    res.status(200).render('index', {title: 'Greet', text: 'Greetings User!!!'});
});