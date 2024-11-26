const express = require('express')
const path = require('path')
const app = express()
const env = require('dotenv')
env.config()
const mongoose = require('mongoose');
app.use(express.json()) //
app.use(express.urlencoded({ extended: true })) //object
const uuid = require('uuid')

const Txn = require('./models/txnModel')


//connect
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
//const db = mongoose.connection;


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/', 'index.html'))
})
app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/', 'create.html'))
})
app.post('/create', async (req, res) => {
  const { amount, pg_method, bank_name, user, date } = req.body
  const txn_id = uuid.v4() //
  const txn = new Txn({ txn_id, amount, pg_method, bank_name, user, date })
  const tmp = await txn.save()
  if (tmp != null) {
    res.redirect('/')
  } else {
    res.redirect('/create?validation=false')
  }
  res.sendFile(path.join(__dirname, '/public/', 'create.html'))
})


app.get('/txns',async (req,res)=>{
    const data = await Txn.find()
    res.json(data)
})

app.get('/txn',async (req,res)=>{
  const id = req.query.id
  console.log(id)
  const data = await Txn.findOne({_id:id})
  res.json(data)
})

app.get('/edit', async (req, res) => {
  res.sendFile(path.join(__dirname, '/public/', 'edit.html'))
})

app.post('/update', async (req, res) => {
  const { id, amount, pg_method, bank_name, user, date } = req.body
  const update = await Txn.findOneAndUpdate({_id:id},{ amount, pg_method, bank_name, user, date })
  if (update) {
    res.redirect('/edit?id='+id+'&validation=false')
  } else {
    res.redirect('/edit?id='+id+'&validation=false')
  }
})
app.get('/delete', async (req, res) => {
  const id = req.query.id
  const d = await Txn.deleteOne({ _id:id})
  res.redirect('/')
})


app.listen(process.env.PORT, () => {

})
