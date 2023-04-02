#!/usr/bin/env node
const commander = require("commander");
const readFormDataJSON = require("./services/fileService");
const {initializeRendering} = require("./services/questionRendererService");
require('dotenv').config();

// commander reads the form data from provided file path
commander
  .command("read")
  .option("-p, --path <model>", "Path to JSON file")
  .action(async (model) => {
    const formDataJSON = readFormDataJSON(model.path);
   await initializeRendering(formDataJSON);
  });

commander.parse(process.argv);
