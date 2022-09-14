const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require("mongoose")
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
require("dotenv").config()

mongoose.connect(process.env.MONGOURL).then(() => {
  console.log("DB-CONNECT-SUCCESE!!!")
}).catch((err) => {
  console.log(err)
})

app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

app.get('/', (req, res) => {
  res.send('ponChannnnnn!!')
})


app.listen(PORT, () => console.log("server up!!!"))
