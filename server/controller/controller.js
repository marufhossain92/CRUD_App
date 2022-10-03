const UserDb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validate request

    //if the fields are empty
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // new user
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data);
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            });
        });
};

//retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
    
}

//update a new identified user by user id
exports.update = (req, res) => {

}

//delete a with specified user id in the request
exports.delete = (req, res) => {

}