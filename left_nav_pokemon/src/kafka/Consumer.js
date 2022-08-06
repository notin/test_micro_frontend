const { Consumer } = require("kafka-node");
const kafkaClient = require("./Client");
const { topic } = require("./config.json");

class KafkaConsumer {
  constructor(client) {
    this.consumer = new Consumer(client, [topic], { autoCommit: false });
    this.addEvents();
  }

  addEvents() {
    this.consumer.on("message", message =>
      console.log(`CONSUMER MESSAGE`, message)
    );
    this.consumer.on("error", err => console.error(`CONSUMER ERR: ${err}`));
  }
}

new KafkaConsumer(kafkaClient);
