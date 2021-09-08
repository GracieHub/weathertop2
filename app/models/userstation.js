"use strict";

const _ = require("lodash");
const JsonStation = require("./json-station");

const userStation = {
  store: new JsonStation("./models/userstation.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getUserByFirstName(firstName) {
    return this.store.findOneBy(this.collection, { firstName: firstName });
  },
  
  getUserByLastName(lastName) {
    return this.store.findOneBy(this.collection, { lastName: lastName });
  },
  
  getUserByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },
  
  updateUser(loggedInUser, updatedUser) {
    
    loggedInUser.firstName = updatedUser.firstName;
    loggedInUser.lastName = updatedUser.lastName;
    loggedInUser.email = updatedUser.email;
    loggedInUser.password = updatedUser.password;
    this.store.save();
  }
}

module.exports = userStation;