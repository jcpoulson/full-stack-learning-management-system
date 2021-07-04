'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs')
const { User } = require('../models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
    let message;
  
    const credentials = auth(req);
    console.log(credentials);
  
    if (credentials) {
      const user = await User.findOne({ where: {emailAddress: credentials.name} });
      console.log(user)
      if (user) {
        const authenticated = bcrypt
          .compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for username: ${user.firstName} ${user.lastName}`);
  
          // Store the user on the Request object.
          req.currentUser = user;
        } else {
          message = `Access Denied: Authentication failure for username: ${user.firstName}`;
        }
      } else {
        message = `Access Denied: User not found for username: ${credentials.name}`;
      }
    } else {
      message = 'Access Denied: Auth header not found';
    }
  
    next();
  };