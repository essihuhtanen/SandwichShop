#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');

/**
 * Connects to the given RabbitMQ host and sends a task to given task queue. 
 * 
 * @param {string} rabbitHost Hostname of the RabbitMQ service
 * @param {string} queueName Name of the task queue to which the task will be sent
 * @param {Object} order The order object to be sent
 */
module.exports.addTask = function(rabbitHost, queueName, order){
  amqp.connect('amqp://' + rabbitHost)
    .then(function(c) {
      c.createConfirmChannel()
      .then( (ch) => {
        ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
        (err, ok) => {
          if (err !== null)
          console.warn(new Date(), 'Message nacked!');
          else
          console.log(new Date(), 'Message acked');
        });
      });
    });
}
