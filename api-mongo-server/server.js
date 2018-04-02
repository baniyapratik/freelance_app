const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./models/User');
require('./models/Project');
require('./models/Bid');

const { mongoose } = require('./db/mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//required for passport

app.use(cookieParser()); // reads cookies

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'ssshhhhh'
  })
); // setting time for the session to be active when the window is open // 5 minutes set currently

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/projectRoutes')(app);
require('./routes/bidRoutes')(app);
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static('../build'));
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
