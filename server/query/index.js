const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const posts = {
  'idj122': {
    id: "jeee",
    title: "title post",
    comments: [
      { id: 'kadf', content: "comment!" }
    ]
  }
}

app.get('/', (req, res) => {
  res.send('Query service running')
})

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  if (type === 'PostCreated') {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data
    const post = posts[postId]
    post.comments.push({ id, content })
  }

  if (type === 'CommentUpdate') {
    const { id, content, postId, status } = data
    const post = posts[postId]
    const comment = post.comments.find(comment => {
      return comment.id === id
    })

    comment.status = status
    comment.comtent = content
  }
  console.log(posts)
  res.send({})

})


app.listen(4002, console.log('Query service run port 4002'))