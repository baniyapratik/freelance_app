var connection = new require('./kafka/connection');
var login = require('./services/login');

var topic_name = ['login_topic'];
var consumer = connection.getConsumer(topic_name[0]);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function(message) {
  console.log('message received');
  console.log(JSON.stringyfy(message.value));
  var data = JSON.parse(message.value);
  login.handle_request(data.data, function(err, res) {
    var payloads = [
      {
        topic: data.replyTo,
        message: JSON.stringyfy({
          correlationId: data.correlationId,
          data: res
        }),
        partition: 0
      }
    ];
    producer.send(payloads, function(err, data) {
      console.log(data);
    });
    return;
  });
});
