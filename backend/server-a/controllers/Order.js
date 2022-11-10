'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
var sendTask = require('../rabbit-utils/sendTask.js')

/**
 * Adds new order to database and sends a task to server B.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.addOrder = function addOrder (req, res, next) {
  var order = req.swagger.params['order'].value;
  Order.addOrder(order)
    .then( function (response) {

      // Let's add the order to a queue
      sendTask.addTask("rapid-runner-rabbit", "received-orders", order);

      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * 
 * Get single order by orderID.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.getOrderById = function getOrderById (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * 
 * Get all orders from database. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Updates the status of an order. 
 * 
 * @param {*} order The order to update. Might have the new status, see the next parameter.
 * @param {*} statusUpdate optional parameter for the new status. If not given, the new status will be read from the order parameter.
 */
module.exports.updateOrderStatus = function updateOrderStatus(order, statusUpdate = '') {

  const orderId = order.id

  console.log("Updating: %s", order);

  if (statusUpdate === '') {
    
    statusUpdate = order.status;
  }
  
  const update = { status : statusUpdate };

  Order.updateOrder(orderId, update)
    .then( () => {
      console.log("Status updated!");
    })
    .catch( () => {
      console.log("Status update failed");
    });
};
