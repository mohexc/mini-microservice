const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

app.get('/events', (req, res) => {
  return res.send('Server is running')
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('orage') ? 'rejected' : 'approved'

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    })
  }
  res.send({})
})

app.listen(4003, console.log('Moderation service on 4003'))