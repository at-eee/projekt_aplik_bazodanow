import mongoose from 'mongoose';

export const animalSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    englishName: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
    },
    latinName: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s]+$/
    },
    //who most recently created or made changes in item's data:
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
});