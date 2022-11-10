'use strict';
const Sandwich = require('../models/sandwich');
const writer = require('../utils/writer');
const auth = require('../middleware/auth');

/**
 * Add a new sandwich to the store. Can only be done by a logged in user.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addSandwich = function(body, req) { 
  return new Promise(async function(resolve, reject) {

    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }

    try {
      const newSandwich = new Sandwich(body);
      await newSandwich.save();
      const response = writer.respondWithCode(201, newSandwich);
      resolve(response);
    } catch {
      const response = writer.respondWithCode(405, "Invalid input");
      reject(response);
    }
  });
}



/**
 * Deletes a sandwich. Can only be done by a logged in user.
 * 
 * @param {*} sandwichId 
 * @returns 
 */
exports.deleteSandwich = function(sandwichId, req) { 
  return new Promise(async function(resolve, reject) {

    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }

    if (!Number.isInteger(sandwichId)) {
      const response = writer.respondWithCode(400, "Invalid ID");
      reject(response);
    }

    const sandwich = await Sandwich.findOne({ id : sandwichId });
    
    if (sandwich === null) {
      const response = writer.respondWithCode(404, "Sandwich not found");
      reject(response);
    } else {
      await Sandwich.deleteOne( { id : sandwichId } );
      resolve(sandwich);
    }

  });
}


/**
 * Find sandwich by ID
 * Returns a single sandwich
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
  return new Promise(async function(resolve, reject) {

    if (!Number.isInteger(sandwichId)) {
      const response = writer.respondWithCode(400, "Invalid ID");
      reject(response);
    }

    const sandwich = await Sandwich.findOne({ id : sandwichId });
    
    if (sandwich === null) {
      const response = writer.respondWithCode(404, "Sandwich not found");
      reject(response);
    } else {
      resolve(sandwich);
    }
    
  });
}


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = function() {
  return new Promise(async function(resolve, reject) {
    const sandwiches = await Sandwich.find();
    resolve(sandwiches);
  });
}


/**
 * Updates a sandwich in the store with JSON in body.
 * Can only be done by a logged in user.
 *
 * sandwichId Long ID of sandwich to return
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateSandwich = function(sandwichId, body) { 
  return new Promise(async function(resolve, reject) {

    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }

    if (!Number.isInteger(sandwichId)) {
      const response = writer.respondWithCode(400, "Invalid ID");
      reject(response);
    }
    const sandwich = await Sandwich.findOne({ id : sandwichId });
    if (sandwich === null) {
      const response = writer.respondWithCode(404, "Sandwich not found");
      reject(response);
    } else {
      try {
        const updatedSandwich = await Sandwich.findOneAndUpdate( { id : sandwichId }, body, { new : true });
        resolve(updatedSandwich);
      } catch {
        const response = writer.respondWithCode(405, "Invalid input");
        reject(response);
      }
    }
  });
}

