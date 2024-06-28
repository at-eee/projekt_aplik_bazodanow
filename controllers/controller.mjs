import { animalSchema } from '../models/schemas/animalSchema.mjs';
import { displayCreateForm, displayEditForm } from './formsController.mjs';
import mongoose from 'mongoose';

const Animal = mongoose.model('Animal', animalSchema);

//Function looking for unique id:
export async function uniqueId(mongooseCollection){
    try{
        const item = await mongooseCollection.findOne().sort({id: 'desc'});
        return (item.id)+1;
    }catch(err){
        throw new Error(String('An error with uniqueId() function has occured.', err.message));
    }
}

//All items listing function:
export const listAnimals = async (req, res) => {
    try{
        res.status(200).render('list', {
            title: 'List of all animals',
            items: await Animal.find().sort({englishName: 'asc'}),
            sortByLatin: false
        })
    }catch(err){
        res.status(500).json({ message: 'An error has occured - something went wrong during listing the animals by english names.', error: err.message });
    }
};

//(by latin names)
export const listAnimalsByLatin = async (req, res) => {
    try{
        res.status(200).render('list', {
            title: 'List of all animals',
            items: await Animal.find().sort({latinName: 'asc'}),
            sortByLatin: true
        });
    }catch(err){
        res.status(500).json({ message: 'An error has occured - something went wrong during listing the animals by latin names.', error: err.message });
    }
};

//show individual animal's subpage
export const displayIndividualAnimal = async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if(id){//checks if given id is in correct format (otherwise reutrns status 404).
        try{
            res.status(200).render('indvItem', {animal: await Animal.findOne({id: id}).populate('author')});
        }catch(err){
            res.status(500).json({ message: 'An error has occured - something went wrong during getting individual animal item.', error: err.message });
        }
    }else{
        res.sendStatus(404);//not found
    }

}

//Item creation functions:
//For GET request:
export const createForm = (req, res) => {
    displayCreateForm(res, null);
}

//For POST request:
export const createNewAnimal = async (req, res) => {
    try{
        if(req.body.animal_englishName && req.body.animal_latinName){

            const animal = new Animal({
                id: await uniqueId(Animal),
                englishName: req.body.animal_englishName,
                latinName: req.body.animal_latinName,
                author: req.user._id,
            });

            const validationError = animal.validateSync();

            if(validationError){
                throw validationError;
            }

            await animal.save();

            res.status(201).json({ message: 'Animal successfully created!!!' });

        }else{
            res.status(500).json({ message: 'An error has occured - something went wrong during creation of a new animal item.', error: 'One (or both) of the fields were empty!'});
            //displayCreateForm(res, "One (or both) of the fields was empty!");
        }
    }catch(err){
        res.status(500).json({ message: 'An error has occured - something went wrong during creation of a new animal item.', error: err.message});
        //displayCreateForm(res, errorHandle(err));
    }
}

//Item editing functions:
//For GET request:
export const editForm = async (req, res) => {

    const id = parseInt(req.params.id, 10);

    if(id){
        try{
            const item = await Animal.findOne({id: id});

            if(item && item.length !== 0){

                displayEditForm(res, item, null);

            }else{
                res.send(404);//not found
            }
        }catch(err){
            res.status(500).json({ message: 'An error has occured - something went wrong during requesting the edit form.', error: err.message });
        }
    }else{
        res.send(404);//not found
    }  
}

//For POST request:
export const editAnimal = async (req, res) => {

    try{
        if(req.body.animal_englishName && req.body.animal_latinName){

            const animal = new Animal({
                id: req.params.id,
                englishName: req.body.animal_englishName,
                latinName: req.body.animal_latinName,
                author: req.user._id,
            });

            const validationError = animal.validateSync();

            if(validationError){
                throw validationError;
            }

            await Animal.updateOne({id: req.params.id}, {
                englishName: req.body.animal_englishName,
                latinName: req.body.animal_latinName,
                author: req.user._id,
            });

            res.status(200).json({ message: 'Animal successfully edited!!!' });

        }else{
            const editedAnimal = await Animal.findOne({id: req.params.id});
            res.status(500).json({ message: 'An error has occured - something went wrong during editing an animal item.', error: 'One (or both) of the fields were empty!'});
            //displayEditForm(res, editedAnimal, "One (or both) of the fields was empty!");
        }
    }catch(err){
        const editedAnimal = await Animal.findOne({id: req.params.id});
        res.status(500).json({ message: 'An error has occured - something went wrong during editing an animal item:', error: err.message });
        //displayEditForm(res, editedAnimal, errorHandle(err));
    }
}

//item deletion function:
export const deleteAnimal = async (req, res) => {
    
    const id = parseInt(req.params.id, 10);

    if(id){
        try{
            await Animal.deleteOne({id: id});
        }catch(err){
            res.status(500).json({ message: 'An error has occured - something went wrong during deletion of the animal item.', error: err.message });
        }
    }else{
        res.send(404);//not found
    }
    
    res.status(200).json({ message: 'Animal successfully deleted!!!' });
}