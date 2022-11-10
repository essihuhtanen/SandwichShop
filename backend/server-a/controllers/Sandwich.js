'use strict';

var utils = require('../utils/writer.js');
var Sandwich = require('../service/SandwichService');

/**
 * 
 * Adds a new sandwich to database. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.addSandwich = function addSandwich (req, res, next) {
  var body = req.swagger.params['body'].value;
  Sandwich.addSandwich(body,req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * Delete single sandwich by ID. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.deleteSandwich = function deleteSandwich (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  Sandwich.deleteSandwich(sandwichId, req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * 
 * Get single sandwich by ID.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.getSandwichById = function getSandwichById (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  Sandwich.getSandwichById(sandwichId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * 
 * Get all sandwiches.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.getSandwiches = function getSandwiches (req, res, next) {
  Sandwich.getSandwiches()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

/**
 * 
 * Updates single sandwich by ID. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.updateSandwich = function updateSandwich (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  var body = req.swagger.params['body'].value;
  Sandwich.updateSandwich(sandwichId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
