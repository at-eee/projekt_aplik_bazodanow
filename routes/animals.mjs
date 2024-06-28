import { Router } from 'express';
import { listAnimals, listAnimalsByLatin, createForm,
        createNewAnimal, displayIndividualAnimal,
        editForm, editAnimal, deleteAnimal } from '../controllers/controller.mjs';

export const animalRoutes = new Router();

//checks user authentication
function checkAuth(req, res, next){

    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({ message: 'User can\'t perform this action without logging in before!!!' });
    }

}

//Listing all the animals.
animalRoutes.get('/', listAnimals);
//listing animals by latin name:
animalRoutes.get('/byLatin', listAnimalsByLatin);

//ADDING an animal.
animalRoutes.get('/create', checkAuth, createForm);
animalRoutes.post('/', checkAuth, createNewAnimal);

//displaying individual animal
animalRoutes.get('/:id', displayIndividualAnimal);

//EDITING existing animal:
animalRoutes.get('/:id/edit', checkAuth, editForm);
animalRoutes.post('/:id', checkAuth, editAnimal);

//DELETING a animal:
animalRoutes.get('/:id/delete', checkAuth, deleteAnimal);
