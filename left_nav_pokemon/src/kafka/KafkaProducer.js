const { Producer } = require("kafka-node");
import KafkaClient from  "./KafkaClient)";
import  config from  "../config.json";
import pk from '../contexts/pk'

const kill = (code = 0) => process.exit(code);
const ERROR = 1;

const KafkaProducer = () => {

  const producer = new Producer(KafkaClient);


  const addEvents=()=> {
    producer.on("error", err => console.error(`PRODUCER ERR: ${err}`));
  }

  const setEvent = () => {
    const message = process.argv[2];
    if (message === undefined) {
      console.error("ERROR: Missing message string");
      kill(ERROR);
    }

    pk.events.push({ ...config, messages: [message] })
  }

  const sendMessage =()=> {
    const { payloads } = this.state;
    producer.on("ready", () => {
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
  setEvent();
  addEvents();
  sendMessage();

}

// new KafkaProducer(kafkaClient);
export default KafkaProducer;
