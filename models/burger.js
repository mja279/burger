// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  all: function(callBack) {
    orm.selectAll("burgers", function(res) {
      callBack(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, callBack) {
    orm.insertOne("burgers", cols, vals, function(res) {
      callBack(res);
    });
  },
  update: function(objColVals, condition, callBack) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      callBack(res);
    });
  },
  delete: function(condition, callBack) {
    orm.delete("burgers", condition, function(res) {
      callBack(res);
    });
  }
};

// Export the database functions for the controller (burgersController.js).
module.exports = burger;
