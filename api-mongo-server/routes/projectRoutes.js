const mongoose = require('mongoose');
const Project = mongoose.model('Project');

const Bid = mongoose.model('Bid');
module.exports = app => {
  //Insert new Project
  app.post('/api/createProject', async (req, res) => {
    const { title, description, skills, budgetLow, budgetHigh, eta } = req.body;
    const userid = req.session.user;
    const project = new Project({
      Title: title,
      Description: description,
      Skills: skills,
      Budget_low: budgetLow,
      Budget_high: budgetHigh,
      File: '',
      dateDone: eta,
      ownerid: userid
    });

    try {
      await project.save();
      res.send(project);
    } catch (err) {
      res.send(400, err);
    }
  });
  app.get('/api/getProjects', (req, res) => {
    var sum = 0;
    var avg = 0;
    var newobj = [];
    const projects = Project.find({})
      .populate('ownerid')
      .exec(function(err, project) {
        project.forEach(function(proj) {
          newobj = JSON.parse(JSON.stringify(proj));
          if (proj._id) {
            const bids = Bid.count({ projectId: proj._id }, function(
              err,
              count
            ) {
              proj.count = count;
            });
            Bid.find({ projectId: proj._id }, function(err, result) {
              if (result.length > 0) {
                //console.log(proj._id);
                result.forEach(function(result) {
                  sum += result.bid_value;
                });
                avg = sum / result.length;
              }

              proj['count'] = result.length;
              newobj['count'] = result.length;
              proj.average = avg;

              newobj['average'] = avg;
              console.log('Before');
              console.log(newobj);
              sum = 0;
              avg = 0;
            });
          }
        });

        res.status(200).send(project);
      });
  });

  app.post('/api/deleteProject', (req, res) => {
    const projectid = req.body._id;

    Project.find({ _id: projectid }).remove().exec();

    res.status(200).send('yolo');
  });

  //Get project Detail
  app.get('/api/projectDetail/:id', (req, res) => {
    const project_id = req.params.id;

    Bid.find({ projectId: project_id })
      .populate('projectId')
      .populate('userId')
      .exec(function(err, result) {
        res.status(200).send(result);
      });
  });

  app.post(
    '/api/projectDetail/projectId/:projectId/userId/:userId',
    (req, res) => {
      const { projectId, userId } = req.params;
      const status = 1;

      Project.findByIdAndUpdate(
        projectId,
        {
          hiredUser: userId,
          status: status
        },
        { new: true },
        function(err, result) {
          if (err) {
            res.status(401).send({ message: 'Error Updating' });
          }

          res.status(200).send(result);
        }
      );
    }
  );
};
