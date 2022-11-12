#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

var dateoptions = {};
var n = 1;
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
        var exchange = "compose104.o";

        channel.assertExchange(exchange, "topic", {
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

            channel.bindQueue("", exchange, "#");

            channel.consume(
              q.queue,
              function (msg) {
                const today = new Date();
                const string = `${Date.toISOString()} ${n} ${msg} to ${exchange}`;
                n = +1;
                console.log(
                  " [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString()
                );
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
        var exchange2 = "compose104.i";

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

            channel.bindQueue("", exchange2, "#");

            channel.consume(
              q.queue,
              function (msg) {
                const today = new Date();
                const string = `${Date.toISOString()} ${n} ${msg} to ${exchange2}`;
                n = +1;
                console.log(
                  " [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString()
                );
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
}, "25000");
