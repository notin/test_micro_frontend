#!/bin/bash

docker run -p 2181:2181 -p 9092:9092 -d --env ADVERTISED_HOST=localhost --env ADVERTISED_PORT=9092 --name kafkatest spotify/kafka

# wait for startup
sleep 3

# add in test topic
echo 'Adding topic "test"'
docker exec kafkatest /opt/kafka_2.11-0.10.1.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test