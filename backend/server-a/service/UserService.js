'use strict';
const writer = require('../utils/writer');
const User = require('../models/user');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = '57632151b6bba675732b9a01e73b0227f19cbf8b2a59994aa6960ca08752ef5fc3ffb7';


/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.createUser = function(body,req) {
  return new Promise(async function (resolve, reject) {
    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }
    console.log(body);
    const {password, id, email, username} = body;

    // Check required fields
    if (password === undefined || id === undefined || email === undefined || username === undefined) {
      console.log('test')
      reject({msg: 'Please fill in all the fields'});
    }

    //Check pass length
    if (password.length < 6) {
      reject({msg: 'Password should be at least 6 characters'});
    }

    const testUser = await User.findOne({username: username, email: email}).exec();
    if (testUser) {
      reject({msg: 'Email already exists'});
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
      await User.create({
        username: username,
        email: email,
        password: hashPassword,
        id: id
      }).then(user =>
          resolve({msg: 'User created'})
      )
    } catch (err) {
      reject({msg: err.message});
    }




    /*const newUserData = {
      username: username,
      email: email,
      password: password,
      id: id
    };
    const newUser = new User(newUserData);
    await newUser.save();

    resolve({msg: 'User created'});*/

  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username,req) {
  return new Promise(async function(resolve, reject) {
    //console.log(auth.auth(req));
    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }
    if (!username) {
      //console.log('test');
      //res.statusCode = 400;
      reject({msg : 'Username not present'});
    }
    const user = await User.findOne({ username: username });
    const tempUser = user;
    //console.log(user);
    if (!user) {
      //res.statusCode = 404;
      reject({msg : 'User does not exist'});
    }
    await User.deleteOne({ username: username});
    resolve(tempUser);
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
exports.getUserByName = function(username, req) {
  return new Promise(async function(resolve, reject) {
    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }
    if (!username) {
      //console.log('test');
      //res.statusCode = 400;
      reject({msg : 'Username or Password not present'});
    }
    const user = await User.findOne({ username: username });
    //console.log(user);
    if (!user) {
      //res.statusCode = 404;
      reject({msg : 'User does not exist'});
    }
    resolve(user);
  });
}


/**
 * Logs user into the system
 *
 * user User The user for login
 * returns String
 **/
exports.loginUser = function(user, res) {
  return new Promise(async function(resolve, reject) {
    console.log(user);
    const { username, password } = user
    var token;
    if (!username || !password) {
      //console.log('test');
      res.statusCode = 400;
      reject({msg : 'Username or Password not present'});
    }
    try {
      const maxAge = 3 * 60 * 60;
      const currentUser = await User.findOne({ username })
      console.log(currentUser);
      if (!currentUser) {
        reject({msg : 'User does not exist'})
      }
      if (!bcrypt.compareSync(password, currentUser.password)) {
        reject({msg : 'Wrong password'})
      } else {
        token = jwt.sign({ id: currentUser._id}, jwtSecret, { expiresIn: maxAge, });
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
      }
    } catch (error) {

    }
    resolve({token: token});
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function(res) {
  return new Promise(function(resolve, reject) {
    console.log('hello4');
    res.clearCookie('jwt');
    //console.log(res.cookie, 'hello');
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(userName,body,res,req) {
  return new Promise(async function(resolve, reject) {
    if (auth.auth(req) === false) {
      reject({msg : 'Not authorized'});
    }
    const {password, id, email, username} = body;
    if (!username || !password || !email) {
      res.statusCode = 400;
      reject({msg : 'Username, Email or Password not present'});
    }
    const currentUser = await User.findOne({ username, email});
    if (!currentUser) {
      res.statusCode = 404;
      reject({msg : 'User does not exist'})
    }
    if (!bcrypt.compareSync(password, currentUser.password)) {
      reject({msg : 'Wrong password'})
    }
    currentUser.username = userName;
    currentUser.save((err) => {
      if (err) {
        reject({msg : err})
      }
      resolve({ message: "Update successful"});
    });
    resolve();
  });
}

