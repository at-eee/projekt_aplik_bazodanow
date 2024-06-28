//Error handling middleware

/*export const errorHandle = (err) => {

    try{
        if(err.code === 11000){
            return new Error('Username is not unique!!!');
        }else if(err.errors){
            if(err.errors.englishName && err.errors.englishName.kind === 'regexp'){
                return new Error('Forbidden characters used in english name field!!!');
            }
            else if(err.errors.latinName && err.errors.latinName.kind === 'regexp'){
                return new Error('Forbidden characters used in latin name field!!!');
            }
            else if(err.errors.password && err.errors.password.kind === 'minlength'){
                return new Error('Password is too short!!! (minimum 3 characters long)');
            }
            else if(err.errors.email && err.errors.email.kind === 'regexp'){
                return new Error('Incorrect email format!');
            }
        }else{
            return err.message;
        }
    }catch(e){
        return err.message;
    }
};*/