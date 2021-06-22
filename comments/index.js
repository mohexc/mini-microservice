const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const { default: axios } = require('axios')
const app = express()

const commentsByPostId = {
  postId: [
    { commentId: "content", }
  ],
}
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('service comments running')
})
app.get('/comments', (req, res) => {
  res.send(commentsByPostId)
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body
  const commentsList = commentsByPostId[req.params.id] || []
  commentsList.push({ id: commentId, content })
  commentsByPostId[req.params.id] = commentsList
  await axios.post(`http://localhost:4005/events`, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  })
  res.status(201).json(commentsByPostId[req.params.id].find(comment => comment.id === commentId))
})

app.post('/events', (req, res) => {
  console.log("Event Received ", req.body.type)
  res.send({})
})


app.listen(4001, console.log('Comment service on port 4001'))