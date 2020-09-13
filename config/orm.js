// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations 
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {burger_name: 'Mushroom Swiss'} => ["burger_name='Mushroom Swiss'"]
      // e.g. {devour: true} => ["devour=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(tableInput, callBack) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callBack(result);
    });
  },

  insertOne: function(table, cols, vals, callBack) {
    var queryString = "INSERT INTO " + table;
    // INSERT INTO ${tableName} ( ${cols.toString()})VALUES (${printQuestionMarks(vals.length)});`
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      callBack(result);
    });
  },

  updateOne: function(table, objColVals, condition, callBack) {
    var queryString = "UPDATE " + table;
    // `UPDATE ${tableName} SET ${objectToSQL(objColVals)} WHERE ${condition};`
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callBack(result);
    });
  },
  
  deleteOne: function(table, condition, callBack) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callBack(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
