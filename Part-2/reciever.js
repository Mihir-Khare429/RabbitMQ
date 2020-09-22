var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(err,connection)=>{
    if(err){
        throw new Error('Error while Connecting with Rabbit MQ')
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw new Error('Error while Connecting with channel')
        }
        var queue = 'Part-2';

// This makes sure the queue is declared before attempting to consume from it
channel.assertQueue(queue, {
  durable: true
});

channel.consume(queue, function(msg) {
  var secs = msg.content.toString().split('.').length - 1;

  console.log(" [x] Received %s", msg.content.toString());
  setTimeout(function() {
    console.log(" [x] Done");
  }, secs * 1000);
}, {
  // automatic acknowledgment mode,
  // see https://www.rabbitmq.com/confirms.html for details
  noAck: true
});
    })
})
