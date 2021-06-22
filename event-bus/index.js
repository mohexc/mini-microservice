const experss = require('express')
const axios = require('axios')

const app = experss()
app.use(experss.json())

app.post('/events', (req, res) => {
  const event = req.body

  axios.post('http://localhost:4000/events', event)
  axios.post('http://localhost:4001/events', event)
  axios.post('http://localhost:4002/events', event)
  res.send({ status: 'OK' })
  console.log('event bus')
})

app.listen(4005, console.log('Server event-bus run port 4005'))