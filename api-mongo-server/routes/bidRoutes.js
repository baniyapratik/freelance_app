const mongoose = require('mongoose');
const Bid = mongoose.model('Bid');

module.exports = app => {
  app.post('/api/userbid', (req, res) => {
    const userId = req.session.user;
    const { bidValue, pid } = req.body;

    Bid.find({ userId: userId, projectId: pid }, function(err, result) {
      if (!result.length) {
        const bid = new Bid({
          bid_value: bidValue,
          projectId: pid,
          userId: userId
        });

        bid.save();
        res.send('200', bid);
      } else {
        console.log(bidValue);
        console.log(result);
        console.log(typeof result);
        Bid.update({ $set: { bid_value: bidValue } }).exec();
        res.send('200');
      }
    });
  });
};
