#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
var fs = require("fs");
const express = require("express");
const app = express();
const port = 9001;

let n = 1;
const filename = "messages.txt";

setTimeout(() => {
  amqp.connect(
    "amqp://rabbitmq?connection_attempts=5&retry_delay=5",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = "compse140.o";

        channel.assertQueue(
          "",
          {
            exclusive: true,
          },
          function (error2, q) {
            if (error2) {
              throw error2;
            }
            console.log(" [*] Waiting for logs. To exit press CTRL+C");

            channel.bindQueue("", exchange, "#");

            channel.consume(
              q.queue,
              function (msg) {
                console.log(
                  " [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString()
                );
                writeToFile(n, exchange, msg.content.toString());
                n = n + 1;
              },
              {
                noAck: true,
              }
            );
          }
        );
      });

      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange2 = "compse140.i";

        channel.assertExchange(exchange2, "topic", {
          durable: false,
        });

        channel.assertQueue(
          "",
          {
            exclusive: true,
          },
          function (error2, q) {
            if (error2) {
              throw error2;
            }
            console.log(" [*] Waiting for logs. To exit press CTRL+C");

            channel.bindQueue(q.queue, exchange2, "#");

            channel.consume(
              q.queue,
              function (msg) {
                console.log(
                  " [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString()
                );
                writeToFile(n, exchange2, msg.content.toString());
                n = n + 1;
              },
              {
                noAck: true,
              }
            );
          }
        );
      });
    }
  );
}, "28000");

const writeToFile = async (n, topic, msg) => {
  const today = new Date();
  const timestamp = today.toISOString();
  const message = `${timestamp} ${n} ${msg} to ${topic} \n`;
  fs.appendFile(filename, message, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Written: ", message);
  });
  return;
};

app.all("/", (req, res) => {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("data read succesfully");
    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`App 2 listening port ${port}`);
});
