export const displayCreateForm = (res, errMsg) => {
    res.status(200).render('form', 
        {title:'Add new animal',
        redirect: '/animals',
        id: '',
        englishName: '',
        latinName: '',
        isEditForm: false,
        errMsg: errMsg}
    );
};

export const displayEditForm = (res, item, errMsg) => {
    res.status(200).render('form', 
        {title: 'Edit existing animal item',
        redirect: '/animals/' + item.id,
        id: item.id,
        englishName: item.englishName,
        latinName: item.latinName,
        isEditForm: true,
        errMsg: errMsg}
    );
};

export const displayLoginForm = (res, errMsg) => {
    res.status(200).render('login', 
        {title: 'Login',
        isRegister: false,
        errMsg: errMsg}
    );
};

export const displayRegisterForm = (res, errMsg) => {
    res.status(200).render('login', 
        {title: 'Register',
        isRegister: true,
        errMsg: errMsg}
    );
};