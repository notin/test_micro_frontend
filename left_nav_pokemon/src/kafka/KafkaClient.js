const { KafkaClient } = require("kafka-node");
const { kafkaHost } = require("./config.json");

const KafkaCLient = () => {
    let kafkaClient = new KafkaClient({ kafkaHost });
    return kafkaClient
}

export default KafkaCLient;
