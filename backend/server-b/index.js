'use strict';

const receiveTask = require('./rabbit-utils/receiveTask.js')

// Start waiting for tasks to arrive. 
receiveTask.getTask('rapid-runner-rabbit', 'received-orders');
