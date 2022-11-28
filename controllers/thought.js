const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ msg: "No Thought with this ID" })
        }
        res.json(dbThoughtData)
      }
      )

      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              console.log('User Id does not exist');
              res.sendStatus(400);
            }
            res.json({ msg: "Thought created Sucessfully" })
          })
      }).catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },
  updateThought({ body, params }, res) {
    Thought.findOneAndUpdate(
      {
        _id: params.id
      },
      {
        $set: body
      },
      {
        runValidators: true,
        new: true
      }
    )
      .then(dbThoughtData => {
        res.json(dbThoughtData)
      }).catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove(
      {
        _id: req.params.id
      }
    ).then(dbThoughtData => {
      res.json(dbThoughtData)
    }).catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
  }

};

module.exports = thoughtController;