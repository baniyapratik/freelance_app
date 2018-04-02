const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const cors = require('cors');
const app = express();

app.use(cors());
//parse application/json
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

const pool = mysql.createPool({
  host: 'localhost',
  user: 'lab2',
  password: 'lab2',
  port: '8889',
  database: 'Projects'
});

function isLoggedIn(req, res) {
  console.log('checking session');
  if (!req.session.user) {
    return res.status(401).send('No user session.');
  }
}
// Return Single Project
app.get('/getProject/:id', bodyParser.json(), (req, res) => {
  const sql = `SELECT * FROM Projects WHERE id= ${req.params.id}`;
  pool.getConnection(function(error, conn) {
    conn.query(sql, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error getting project' });
        return;
      } else {
        res.status(200).send(results);
      }
    });
    conn.release();
  });
});

//Return all Projects
app.get('/api/getProjects', bodyParser.json(), (req, res) => {
  const sql =
    'SELECT Distinct Projects.id,  Projects.ownerid, DATE_FORMAT(Projects.dateDone, "%d/%m/%Y") AS dateDone , DATE_FORMAT(Projects.dateCreated, "%d/%m/%Y") AS date, Projects.status, Projects.Title, Projects.Description, Projects.Budget_high,' +
    'Projects.Budget_low, IFNULL(COUNT(Bids.projectId),0) as cnt, IFNULL(AVG(Bids.bid_value ), 0) as aver , Users.firstName, ' +
    'Users.lastName FROM Projects LEFT JOIN Users on Projects.ownerid = Users.id ' +
    'LEFT JOIN Bids on Projects.id = Bids.projectId GROUP BY Projects.id ORDER BY Projects.ownerid';
  pool.getConnection(function(error, conn) {
    conn.query(sql, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error getting All Projects' });
        return;
      } else {
        res.status(200).send(results);
      }
    });
    conn.release();
  });
});

//delete Single Project

app.post('/api/deleteProject', bodyParser.json(), (req, res) => {
  const projectid = req.body.id;

  const sql = 'DELETE FROM Projects  WHERE id= ?';

  pool.getConnection(function(error, conn) {
    conn.query(sql, projectid, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error deleting Post' });
        return;
      } else {
        res.status(200).send({ message: 'Post deleted' });
      }
    });
    conn.release();
  });
});
//Insert new Project
app.post('/api/createProject', bodyParser.json(), (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const skills = req.body.skills;
  const budgetLow = req.body.budgetLow;
  const File = null;
  const budgetHigh = req.body.budgetHigh;
  const eta = req.body.eta;
  const userid = req.session.user;

  const post = {
    Title: title,
    Description: description,
    Skills: skills,
    Budget_low: budgetLow,
    Budget_high: budgetHigh,
    dateDone: eta,
    File,
    ownerid: userid
  };

  const sql = 'INSERT INTO Projects SET ?';

  pool.getConnection(function(error, conn) {
    conn.query(sql, post, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error adding Post' });
        return;
      } else {
        res.status(200).send({ message: 'Post added' });
      }
    });
    conn.release();
  });
});

const comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};

app.post('/api/login', (req, res) => {
  const sql =
    'SELECT id, email, password, firstName from Users where email = ?';

  let email = '';
  let pass = '';
  let numRows = '';
  pool.getConnection(function(error, conn) {
    conn.query(sql, req.body.email, (err, results) => {
      numRows = results.length;
      if (numRows > 0) {
        email = results[0].email;
        pass = results[0].password;

        const userPass = bcrypt.compareSync(req.body.password, pass);

        // you might like to do a database look-up or something more scalable here
        if (numRows > 0 && userPass == true) {
          console.log('yeppie');

          req.session.user = results[0].id;
          console.log('This is your session');
          console.log(req.session);
          res
            .status(200)
            .send({ username: results[0].firstName, userid: results[0].id });
        } else {
          res.status(401).send({ username: '', userid: '' });
        }
      } else {
        console.log('Sad!');
        res.status(401).send({ username: '', userid: '' });
      }
    });

    conn.release();
  });
});

app.post('/api/createUser', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  const sql =
    'INSERT INTO Users (id, firstName, lastName, email, phone, About, Skills, password) VALUES (NULL, ?, ?, ?, NULL, NULL, NULL, ?)';
  const user = [firstName, lastName, email, pass];

  pool.getConnection(function(error, conn) {
    conn.query(sql, user, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error adding User' });
        return;
      } else {
        res.status(200).send({ message: 'User added' });
      }
    });
    conn.release();
  });
});

app.post('/api/userbid', (req, res) => {
  const userId = req.session.user;
  const bidValue = req.body.bidValue;
  const projectId = req.body.pid;
  /*
  Checking if this user already made a bid or not
  */
  const query1 =
    'SELECT * from Bids where userid = ' +
    userId +
    ' AND  projectId = ' +
    projectId;
  const query2 =
    'UPDATE Bids SET bid_value = ' +
    bidValue +
    ' WHERE userid = ' +
    userId +
    ' and projectId=' +
    projectId;

  pool.getConnection(function(error, conn) {
    conn.query(query1, (err, results) => {
      if (results.length > 0) {
        pool.getConnection(function(error, conn) {
          conn.query(query2, (err, results) => {
            if (err) {
              res.status(401).send({ message: 'Error Updatning Bid Value' });
              return;
            } else {
              res.status(200).send({ message: 'Bid Value Updated' });
            }
          });
          conn.release();
        });
      } else {
        const sql =
          'INSERT INTO Bids (id, projectId, userId, bid_value) VALUES (NULL, ?, ?,  ?)';
        const sql2 = '';
        const info = [projectId, userId, bidValue];

        pool.getConnection(function(error, conn) {
          conn.query(sql, info, (err, results) => {
            if (err) {
              console.log(err);
              res.status(404).send({ message: 'Error adding Bid' });
              return;
            } else {
              res.status(200).send({ message: 'Bid added' });
            }
          });
          conn.release();
        });
      }
    });
    conn.release();
  });
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).send({ message: 'Success' });
});

//Get project Detail
app.get('/api/projectDetail/:id', (req, res) => {
  const project_id = req.params.id;
  const sql =
    'SELECT Users.firstName, Users.lastName, Users.id as user_id, Users.Skills as user_skills, Users.email, Bids.bid_value, Bids.bidDate, ' +
    'Projects.Title, Projects.Description, Projects.Skills as project_skills, DATEDIFF( Projects.dateDone, CURRENT_TIMESTAMP) as DateDiff ' +
    'FROM Projects LEFT JOIN Bids ON Projects.id = Bids.projectId ' +
    'LEFT JOIN Users ON Users.id = Bids.userId WHERE projects.id = ' +
    project_id;

  pool.getConnection(function(error, conn) {
    conn.query(sql, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error' });
        return;
      } else {
        res.status(200).send(results);
      }
    });
    conn.release();
  });
});

app.post(
  '/api/projectDetail/projectId/:projectId/userId/:userId',
  (req, res) => {
    const project_id = req.params.projectId;
    const user_id = req.params.userId;
    const status = 1;

    const sql =
      'INSERT INTO Hired (id, projectId, hiredId, hiredDate) VALUES (NULL, ?, ?, NULL)';
    const sql2 =
      'UPDATE Projects SET status = ' + status + ' WHERE  id = ' + project_id;

    const ids = [project_id, user_id];
    console.log('Here');
    console.log(user_id);
    pool.getConnection(function(error, conn) {
      conn.query(sql, ids, (err, results) => {
        console.log('here');
        console.log(results);
        if (err) {
          console.log(err);
        } else {
          pool.getConnection(function(error, conn) {
            conn.query(sql2, (err, results) => {
              if (err) {
                res.status(401).send({ message: err });
                return;
              } else {
                res.status(200).send(results);
              }
            });
            conn.release();
          });
        }
      });
      conn.release();
    });
  }
);

app.post('/api/updateUserInfo/:userid', (req, res) => {
  const firstName = req.body.firstName
    ? req.body.firstName
    : req.body.initial_firstName;

  const lastName = req.body.lastName
    ? req.body.lastName
    : req.body.initial_lastName;

  const email = req.body.email ? req.body.email : req.body.initial_email;
  const phone = req.body.phone ? req.body.phone : req.body.initial_phone;
  const skills = req.body.skills ? req.body.skills : req.body.initial_skills;
  const about = req.body.about ? req.body.about : req.body.initial_about;
  const userid = req.params.userid;
  console.log;
  const sql =
    'UPDATE Users SET firstName=' +
    "'" +
    firstName +
    "'" +
    ', lastName=' +
    `'${lastName}'` +
    ', email=' +
    `'${email}'` +
    ', phone=' +
    `'${phone}'` +
    ', About=' +
    `'${about}'` +
    ', Skills=' +
    `'${skills}'` +
    ' where id = ' +
    userid;
  console.log('Here');
  console.log(sql);

  pool.getConnection(function(error, conn) {
    conn.query(sql, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error' });
        return;
      } else {
        res.status(200).send();
      }
    });
    conn.release();
  });
});
app.get('/api/getUserInfo/:userid', (req, res) => {
  const userid = req.params.userid;
  const sql =
    'SELECT Users.firstName, Users.lastName, Users.email, Users.phone, Users.About, Users.Skills from Users where users.id = ' +
    userid;
  pool.getConnection(function(error, conn) {
    conn.query(sql, (err, results) => {
      if (err) {
        res.status(401).send({ message: 'Error' });
        return;
      } else {
        res.status(200).send(JSON.stringify(results[0]));
      }
    });
    conn.release();
  });
});
app.listen(5003);
module.exports.app = app;
