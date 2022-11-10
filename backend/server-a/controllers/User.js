'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = '57632151b6bba675732b9a01e73b0227f19cbf8b2a59994aa6960ca08752ef5fc3ffb7';

/**
 * Create new user. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.createUser = function createUser (req, res, next) {
  console.log(req.cookies);
  var body = req.swagger.params['body'].value;
  User.createUser(body,req)
      .then(function (response) {
        console.log(response);
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        console.log(response);
        utils.writeJson(res, response);
      });
};

/**
 * Delete single user.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.deleteUser = function deleteUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  //console.log(req.headers.authorization);
  //console.log(req.cookies);
  //console.log(username);
  User.deleteUser(username,req)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

/**
 * Get single user by name.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.getUserByName = function getUserByName (req, res, next) {
  console.log(req.cookies);
  var username = req.swagger.params['username'].value;
  User.getUserByName(username, req)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

/**
 * Logs user in.
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.loginUser = function loginUser (req, res, next) {
  var user = req.swagger.params['user'].value;
  console.log(user);
  var body = req.body;
  console.log(body);
  User.loginUser(user, res, next)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

/**
 * Logs user out. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser(res)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

/**
 * Update single user by username. 
 * 
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response 
 * @param {function} next 
 */
module.exports.updateUser = function updateUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var body = req.swagger.params['body'].value;
  User.updateUser(username,body,res,req)
      .then(function (response) {
        console.log(res.statusCode);
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        console.log(res.statusCode);
        utils.writeJson(res, response);
      });
};
