'use strict';
const Order = require('../models/order');
const writer = require('../utils/writer');
const Sandwich = require('../service/SandwichService');

/**
 * Add new order to database. 
 * 
 * @param {Object} order 
 * @returns Promise
 */
exports.addOrder = function(order) {
  return new Promise(async function(resolve, reject) {
    const { id, sandwichId, status } = order;

    if (id && sandwichId) {

      // Check that sandwichId is ok and in selection:
      const sandwich = Sandwich.getSandwichById(sandwichId)
        .then( async () => {
          order.status = 'received';
          const newOrder = new Order(order);
          await newOrder.save();
          const res = writer.respondWithCode(200, newOrder);
          resolve(res);
        })
        .catch( () => {
          const res = writer.respondWithCode(400, 'Sandwich not found!');
          reject(res);
        });
    }

    else { 
      const res = writer.respondWithCode(400, 'Order not created');
      reject(res);
    }
  });
}


/**
 * Find an order by ID
 * IDs must be positive integers
 * 
 * @param {number} orderId Must be positive integer
 * @returns Promise
 */
exports.getOrderById = function(orderId) {
  return new Promise(async function(resolve, reject) {
    if (orderId < 0 || !Number.isInteger(orderId)) {
      const res = writer.respondWithCode(400, 'Invalid ID supplied');
      reject(res);
    }
    
    const order = await Order.findOne({ id: orderId});

    if (!order) {
      const res = writer.respondWithCode(404, 'Order not found');
      reject(res);
    }

    else {
      resolve(order);
    }
  });
}


/**
 * Get all orders. Empty array if no orders are found.
 * @returns Promise 
 */
exports.getOrders = function() {
  return new Promise(async function(resolve, reject) {
    const arr = [];
    const orders = await Order.find();
    if (orders.length < 1) {
      resolve(arr);
    }
    resolve(orders);
  });
}

/**
 * Update the status of an order
 * 
 * orderId Integer ID of the order to be updated
 * update JSON string, e.g. { status : 'ready' }
 * 
 * @param {number} orderId integer value
 * @param {Object} update JSON string
 */
exports.updateOrder = ( (orderId, update) => {
  return new Promise( async function(resolve, reject) {
    const upDatedOrder = await Order.findOneAndUpdate( { id : orderId}, update);
    
    if (upDatedOrder === null) {
      reject();
    } else {
      resolve();
    }
  });
});

