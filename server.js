const mongoose = require('mongoose')
dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./index')

mongoose.connect(process.env.LOCAL_CONN_STR)
  .then((conn) => {
    console.log('DB connection Successfull');
  }).catch((err) => {
    console.log(err);
  })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})