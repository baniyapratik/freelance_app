const kafka = require('kafka-node');

function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    if (!this.kafkaConsumerConnection) {
      this.client = new kafka.Client('localhost:9092');
      this.kafkaConsumerConnection = new kafkaConsumer(this.client, [
        { topic: topic_name, partition: 0 }
      ]);
      return this.kafkaConsumerConnection;
    }

    this.getProducer = function() {
      if (!this.kafkaProducerConnection) {
        this.client = new kafka.Client('localhost:9092');
        var HighLevelProducer = kafka.HighLevelProducer;
        this.kafkaProducerConnection = new HighLevelProducer(this.client);
        console.log('producer is ready');
      }
      return this.kafkaProducerConnection;
    };
  };
}
module.exports = new ConnectionProvider();
