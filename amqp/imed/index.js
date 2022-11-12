#!/usr/bin/env node

var amqp = require("amqplib/callback_api");

setTimeout(() => {
  var message = "default";
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
            channel.bindQueue(q.queue, exchange, "#");

            channel.consume(
              q.queue,
              function (msg) {
                console.log(
                  " [x] %s:'%s'",
                  msg.fields.routingKey,
                  msg.content.toString()
                );
                message = msg.content.toString();
                sendMessage(message);
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

const sendMessage = (message) => {
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
        var exchange2 = "compse140.i";
        channel.assertExchange(exchange2, "topic", {
          durable: false,
        });
        channel.publish(exchange2, "compse140.i", Buffer.from(message));
        console.log(" [x] Sent %s:'%s'", "compse140.i", message);
      });

      setTimeout(function () {
        connection.close();
        process.exit(0);
      }, 500);
    }
  );
};
