import mqtt from 'mqtt'
import sqlite3pkg from 'sqlite3'

const client = mqtt.connect('mqtt://192.168.0.2')
const sqlite3 = sqlite3pkg.verbose()
const database = new sqlite3.Database('./data.db')

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
  if (topic === 'weather') {
    handleWeatherEvent(message)
  }
})

const handleWeatherEvent = message => {
  try {
    const weatherObj = JSON.parse(message.toString())
    database.run(
      `INSERT INTO weather (temperature, humidity) values (${weatherObj.temperature}, ${weatherObj.humidity});`,
    )
    console.log(weatherObj)
  } catch (err) {
    console.log(err)
  }
}
