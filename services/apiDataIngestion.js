const gql = require("gql-query-builder");
const { GraphQLClient } = require("graphql-request");
const logger = require("../config/loggerConfig");
require("dotenv").config({path:`${__dirname}/./../.env`});

async function postCollectedData(
  data,
  flowDefinition,
  contentDataDefinition,
  userInput
) {
  const modelData = gql.mutation({
    operation: "createFormData",
    variables: {
      createFormDataInput: {
        value: data,
        type: "[CreateFormDataInput!]!",
      },
      formFlowInput: {
        value: flowDefinition,
        type: "FormFlowInput",
      },
      dataDefinitionInput: {
        value: contentDataDefinition,
        type: "DataDefinitionInput",
      },
      userInput: {
        value: userInput,
        type: "Object",
      },
    },
    fields: [
      "submittedFormData {collectedDateTime ,collectedTimezone , receivedDateTime, sourceQuestionId, configuredQuestionText, displayedQuestionText, rawInput, selectedOptions{key,value,textShownToUser}, formattedInput, calculatedResult, metadata {submissionPlatform,submissionFormFactor,language}}",
      "nextDataPointId",
    ],
  });
  const apiUrl = process.env.API_URL;
  const serviceClient = new GraphQLClient(apiUrl);
  let submittedFormDataRes = null;
  await serviceClient
    .request(modelData.query, modelData.variables)
    .then((result) => {
      submittedFormDataRes = result.createFormData;
    })
    .catch((error) => {
      logger.error("unexpected error: Invalid Input", error);
    });
    return submittedFormDataRes;
}
module.exports = postCollectedData;