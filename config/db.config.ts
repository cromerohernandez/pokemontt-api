const mongoose = require('mongoose')

let mongodbConnection = process.env.MONGODB_URI
let mongodbNameConnection = 'mongodb-atlas-pokemontt'

mongoose.connect(mongodbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to the database ${mongodbNameConnection}`))
  .catch((error: any) => console.error(`An error ocurred trying to connect to the database ${mongodbNameConnection}`, error))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
      console.log('Mongoose disconnected on app termination')
      process.exit(0)
  })
})
