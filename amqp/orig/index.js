var amqp = require("amqplib/callback_api");

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
        var key = "compse140.o";
        for (var i = 1; i <= 3; i++) {
          channel.publish(exchange, key, Buffer.from(`MSG_${i}`));
          setTimeout(() => {
            console.log(" [x] Sent %s:'%s'", key, `MSG_${i}`);
          }, "3000");
        }
      });
    }
  );
}, "30000");
