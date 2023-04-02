const inquirer = require("inquirer");
const logger = require("../config/loggerConfig");

const inquirerContentType = {
  text: "text",
  number: "number",
  password: "password",
  checkbox: "checkbox",
  confirm: "confirm",
  list: "list",
};

async function prompt({ contentDataDefinition, contentType }) {
  const content = {
    id: contentDataDefinition.id,
    type: inquirerContentType[contentType] ?? "editor",
    message: contentDataDefinition.questionText,
    name: contentDataDefinition.name,
    choices: contentDataDefinition.options ?? [],
  };

  return await inquirer
    .prompt(content)
    .then((answer) => {
      return answer;
    })
    .catch((error) => {
      logger.error("Error : Unable to prompt the questions ");
      throw error;
    });
}
module.exports = prompt;
