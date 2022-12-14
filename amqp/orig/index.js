var amqp = require("amqplib/callback_api");

setTimeout(() => {
  amqp.connect(
    "amqp://rabbitmq?connection_attempts=5&retry_delay=5",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(async function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var exchange = "compse140.o";
        var key = "compse140.o";
        let i = 0
        while (true) {
          channel.publish(exchange, key, Buffer.from(`MSG_${i}`));
          console.log(" [x] Sent %s:'%s'", key, `MSG_${i}`);
          i =+ 1
          await sleep(3000);
        }
      });
    }
  );
}, "3000");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
