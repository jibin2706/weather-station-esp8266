import mqtt from 'mqtt'

const client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'connection established')
    } else {
      console.log(err)
    }
  })
})

client.subscribe('weather')

client.on('message', (topic, message) => {
  console.log(topic, message.toString())
})