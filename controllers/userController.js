const { User, Thought } = require('../models')

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Get a single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      'thoughts friends'
    )
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Create a user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId })
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' })
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } })
    res.json({ message: 'User and associated thoughts deleted!' })
  } catch (err) {
    res.status(500).json(err)
  }
}

// Add friend
const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Remove friend
const removeFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
}
