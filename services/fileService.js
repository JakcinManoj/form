const fs = require("fs");
const logger = require("../config/loggerConfig");
const readFormDataJSON = (path) => {
  var formDataJSON = null;
  try {
    formDataJSON = fs.readFileSync(path, "utf8");
  } catch (err) {
    logger.error (err);
  }
  return formDataJSON;
};
module.exports = readFormDataJSON;
