const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000
const app = express();
app.use(cors())

// mongoose
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_CONNECTION, dbOptions, (err) => {
  if (err) {
    console.log('not connected ❌')
  } else {
    console.log('connected ✅')
  }
})

// express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// passport
const passport = require('./initializers/passport')
app.use(passport.initialize())
app.use(passport.session())

// require all routes
app.use(require('./routes'))

app.listen(PORT, () => console.log(`Live on port ${PORT}`))