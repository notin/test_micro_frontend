const { Producer } = require("kafka-node");
const kafkaClient = require("./Client");
const { topic } = require("./config.json");

const kill = (code = 0) => process.exit(code);
const ERROR = 1;

class KafkaProducer {
  constructor(client) {
    this.producer = new Producer(client);
    this.setState();
    this.addEvents();
    this.sendMessage();
  }

  addEvents() {
    this.producer.on("error", err => console.error(`PRODUCER ERR: ${err}`));
  }

  setState() {
    const message = process.argv[2];
    if (message === undefined) {
      console.error("ERROR: Missing message string");
      kill(ERROR);
    }
    this.state = {
      payloads: [{ ...topic, messages: [message] }]
    };
  }

  sendMessage() {
    const { payloads } = this.state;
    this.producer.on("ready", () => {
      console.log("PRODUCER READY");

      this.producer.send(payloads, err => {
        if (err) {
          console.log(`PRODUCER ERROR: ${err}`);
          kill(ERROR);
        } else {
          console.log("PRODUCER message sent message");
          kill();
        }
      });
    });
  }
}

new KafkaProducer(kafkaClient);
