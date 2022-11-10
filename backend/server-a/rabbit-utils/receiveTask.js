#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
const { updateOrderStatus} = require('../controllers/Order');
const Order = require('../models/order');

/**
 * Creates a connection and task queue with given host and queue name. 
 * Waits for tasks and works accordingly when a task is received. 
 * 
 * @param {string} rabbitHost Hostname of the RabbitMQ service
 * @param {string} queueName Name of the task queue from which the task will be received
 */
module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).
  then( (conn) => {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel()
      .then( (ch) => {
        var ok = ch.assertQueue(queueName, {durable: true});

        ok = ok.then( () => { ch.prefetch(1); });
        ok = ok.then( () => {
          ch.consume(queueName, doWork, {noAck: false});
          console.log("Waiters ready for orders whenever the bell DINGs");
        });
        return ok;

        /**
         * The function to take action once a task is received. 
         * Forwards the order info from server B to update the order status accordingly. 
         * @param {Buffer} msg Content of the received task.
         */
        function doWork(msg) {

          ch.ack(msg);
          const order = JSON.parse(msg.content.toString());
          console.log("Message from kitchen : ", order);

          updateOrderStatus(order);

        }
      });
  }).catch(console.warn);
}
