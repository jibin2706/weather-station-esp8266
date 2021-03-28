import mqtt from 'mqtt'

const client  = mqtt.connect('mqtt://broker.emqx.io')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      console.log('connection established')
      client.publish('presence', 'connection established')
    } else {
      console.log('err', err)
    }
  })
})

client.subscribe('weather')

client.on('message', (topic, message) => {
  console.log(topic, message.toString())
})