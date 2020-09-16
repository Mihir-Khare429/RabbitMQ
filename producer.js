const app = require('express')();
const amqp = require('amqplib/callback_api');

//Connecting To RabbitMQ Local Server

amqp.connect('amqp://localhost',(err,connection)=>{
    if(err){
        throw new Error(`Error : ${err}`)
    }
    
    connection.createChannel((err,channel)=>{
        if(err){
            throw new Error(`Error : ${err}`)
        }
        var queue = 'hello';
        var msg = 'Hello world'; //Byte Array 

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue,Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    })

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
})