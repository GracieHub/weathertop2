"use strict";

const userstation = require("../models/userstation");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstation.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstation.getUserByEmail(request.body.email);
    const password = userstation.getUserByPassword(request.body.password);
    if (user&&password) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.station;
    return userstation.getUserByEmail(userEmail);
  },
  
  getUser(request, response){
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      email: loggedInUser.email,
      password: loggedInUser.password,
    };
    logger.info("about to render USER", viewData);
    logger.info(`Logged in user is ${loggedInUser.firstName} ${loggedInUser.lastName}`);
    response.render("user", viewData);
  },
  
    updateUser(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const user = loggedInUser.email;
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    response.cookie("station", request.body.email);
    logger.debug(`Updating User`);
    userstation.updateUser(loggedInUser, updatedUser);
    response.render("user", updatedUser);
  }
};

module.exports = accounts;

