const mongoose = require('mongoose')
const { User, Thought } = require('./models')

// Sample data for seeding
const users = [
  {
    username: 'john_doe',
    email: 'john@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    thoughts: [],
    friends: [],
  },
]

const thoughts = [
  {
    thoughtText: "This is John's first thought!",
    username: 'john_doe',
    reactions: [],
  },
  {
    thoughtText: "This is Jane's first thought!",
    username: 'jane_smith',
    reactions: [],
  },
]

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network-api', {})

const seedDatabase = async () => {
  try {
    // Clear existing users and thoughts
    await User.deleteMany({})
    await Thought.deleteMany({})

    console.log('Existing data cleared.')

    // Insert users and thoughts
    const createdUsers = await User.insertMany(users)
    const createdThoughts = await Thought.insertMany(thoughts)

    console.log('Users and thoughts inserted.')

    // Associate thoughts with the users
    for (let thought of createdThoughts) {
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      )
      console.log(`Associated thought with user: ${user.username}`)
    }

    console.log('Database seeded successfully!')
    mongoose.connection.close()
  } catch (err) {
    console.error(err)
    mongoose.connection.close()
  }
}

seedDatabase()
