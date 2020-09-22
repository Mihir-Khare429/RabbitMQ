var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(err,connection)=>{
    if(err){
        throw new Error('Error while Connecting with Rabbit MQ')
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw new Error('Error while Connecting with channel')
        }
        var queue = 'Part-2'
        var msg = process.argv.slice(2).join(' ') || "Hello World!";
        channel.assertQueue(queue,{
            durable:true
        })
        setInterval(function(){
            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true
              });
              console.log(" [x] Sent '%s'", msg);
        })
        },1000)
        
})