const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/api/userRoutes')
const thoughtRoutes = require('./routes/api/thoughtRoutes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/thoughts', thoughtRoutes)

mongoose.connect('mongodb://localhost/social-network-api', {})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
