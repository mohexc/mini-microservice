const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
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
  res.send(commentsByPostId[req.params.id].reverse() || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body
  const commentsList = commentsByPostId[req.params.id] || []
  commentsList.push({ id: commentId, content })
  commentsByPostId[req.params.id] = commentsList
  res.status(201).json(commentsByPostId[req.params.id].find(comment => comment.id === commentId))
})

app.listen(4001, console.log('Server service posts on port 4001'))