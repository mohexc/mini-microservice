const experss = require('express')
const axios = require('axios')

const app = experss()
app.use(experss.json())

app.post('/events', (req, res) => {
  const event = req.body

  axios.post('http://localhost:4000/events', event) // posts service
  axios.post('http://localhost:4001/events', event) // comment service
  axios.post('http://localhost:4002/events', event) // event-bus service
  res.send({ status: 'OK' })
  console.log('event bus')
})



app.listen(4005, console.log('Event-bus run port 4005'))