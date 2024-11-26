const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express()
app.use(express.json())//text data: object/array
app.use(express.urlencoded({ extended: true })); //important
const env = require('dotenv')
env.config()

const User = require('./models/User');


mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/','index.html'))
})
app.get('/add',(req,res)=>{
  res.sendFile(path.join(__dirname,'/public/','adduser.html'))
})


//insert user
app.post('/insert-user',async (req,res)=>{
 // const body =req.body
  const user = new User(req.body)
  const temp = await user.save()
  console.log(temp)

  res.send('ok')
})

app.listen(process.env.PORT,()=>{
  console.log('serer is running')
})
