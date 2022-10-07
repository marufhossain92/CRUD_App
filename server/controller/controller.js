const UserDb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request

  //if the fields are empty
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // new user
  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
      //res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

//retrieve and return all users / retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    UserDb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Cannot find user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error retrieving user with id ${id}` });
      });
  } else {
    UserDb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retrieving user information",
        });
      });
  }
};

//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id; //url query

  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Can not update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id ${id}. Maybe id is wrong.`,
        });
      } else {
        res.send({ mesage: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could not delete user with id ${id}` });
    });
};
