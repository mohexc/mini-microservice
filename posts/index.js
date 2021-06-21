const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const app = express()
const posts = []

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('service posts running')
})

app.get('/posts', (req, res) => {
  res.send(posts.reverse())
})

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts.push({ id, title })
  res.status(201).json({ id, title })
})

app.listen(4000, console.log('Server service posts on port 4000'))