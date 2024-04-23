# Hava Havai CRUD api

Implemented with - Joi validation | JWT authetication | Mongoose 

## Apis implemented - 

### Autheticated routes - (takes JWT token)

/user/get - get a user \
/user/all - get all users  \
/user/update - update a user 

### Open routes - 

/user/create - create new user, takes user object 
    
    {
        "username" : "damns7",
        "email" : "damns7@gmail.com",
        "age" : "55",
        "name" : "damnCHANGED man",
        "password" : "Damn123@" 
    }


/user/login - logins and **returns JWT token** 

    {
        "email" : "damns7@gmail.com",
        "password" : "Damn123@" 
    }

Deployed Link - https://havacrud.onrender.com/



