const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const { default: axios } = require('axios')
const app = express()
const posts = []

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('service posts running')
})

app.get('/posts', async (req, res) => {
  res.send(posts.reverse())
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts.push({ id, title })
  await axios.post('http://localhost:4005/events', {
    type: "PostCreated",
    data: { id, title }
  })
  res.status(201).json(posts.find(post => post.id === id))
})

app.post('/events', (req, res) => {
  console.log("EventReceived ", req.body.type)
  res.send({})
})

app.listen(4000, () => {
  console.log('v55')
  console.log('Posts service  on port 4000')
})