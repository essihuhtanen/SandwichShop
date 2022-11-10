#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
const sendTask = require('./sendTask');

/**
 * Creates a connection and task queue with given host and queue name. 
 * Waits for tasks and works accordingly when a task is received. 
 * 
 * @param {string} rabbitHost Hostname of the RabbitMQ service
 * @param {string} queueName Name of the task queue from which the task will be received
 */
module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost)
    .then( (conn) => {
      process.once('SIGINT', function() { conn.close(); });
      return conn.createChannel()
        .then(function(ch) {
          var ok = ch.assertQueue(queueName, {durable: true});
          ok = ok.then( () => { ch.prefetch(1); });
          ok = ok.then( () => {
            ch.consume(queueName, doWork, {noAck: false});
            console.log(new Date(), "Kitchen is ready to make sum sandwiches!");
          });
          return ok;

          /**
         * The function to take action once a task is received. 
         * 
         * @param {Buffer} msg Content of the received task.
         */
          function doWork(msg) {
            
            //JSON-ize the order to easily access the status
            const order = JSON.parse(msg.content.toString());
            console.log("Received order in json: %s", order);
            
            // Let any interested parties know that the order is in queue:
            order.status = 'inQueue';
            sendTask.addTask("rapid-runner-rabbit", "order-update", order);
            ch.ack(msg);

            // Take your time to process the order:
            setTimeout( () => {

              // Ok, the order is now ready!
              order.status = 'ready';
              sendTask.addTask("rapid-runner-rabbit", "order-update", order);

            }, 10000);
          }
        });
    }).catch(console.warn);
}
