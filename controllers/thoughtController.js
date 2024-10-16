const { Thought, User } = require('../models')

// Get all thoughts
const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find()
    res.json(thoughts)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Get a single thought
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Create a new thought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    )
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Update a thought
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    )
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Delete a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    })
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' })
    }
    res.json({ message: 'Thought deleted!' })
  } catch (err) {
    res.status(500).json(err)
  }
}

// Add a reaction
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

// Remove a reaction
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    res.json(thought)
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
}
