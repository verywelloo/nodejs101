const mongoose = require('mongoose')

const connectionString = "mongodb+srv://verywelloo:1684171t@nodeexpressprojects.0ogkxwz.mongodb.net/3-Task-Manager?retryWrites=true&w=majority"

mongoose
    .connect(connectionString)
    .then(()=>console.log('Connect to the DB...'))
    .catch((err)=>console.log(err))