const mongoose = require('mongoose')


async function connectToDB() {
  console.log(process.env)
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'ums' })
    console.log("Connection to DB Successfull")
  } catch (error) {
    console.log("Error Connecting to DB")
    process.exit()
  }
}

module.exports = connectToDB
console.log(connectToDB)