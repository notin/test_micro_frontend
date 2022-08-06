const { KafkaClient } = require("kafka-node");
const { kafkaHost } = require("./config.json");

module.exports = new KafkaClient({ kafkaHost });
