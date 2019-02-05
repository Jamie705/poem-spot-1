const { Poem } = require("../models/");

// Defining methods for the PoemsController
module.exports = {
  findAll(req, res) {
    Poem
      .find()
      .limit(10)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser(req, res) {
    // const userID = req.user.id;
    Poem
      .find({ _id: req.user.id })
      .limit(5)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById(req, res) {
    Poem
      .findById({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create(req, res) {
    const {
      body,
      user,
    } = req;

    const poem = {
      title: body.title,
      author: body.author,
      body: body.body,
      user: user.id,
    };
    Poem
      .create(poem)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update(req, res) {
    Poem
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove(req, res) {
    Poem
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
