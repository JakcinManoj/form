const promptContent = require("./questionPromptService");
const postCollectedData = require("../services/apiDataIngestion");
const { first, sortBy, find } = require("lodash");
const { DateTime } = require("luxon");
const {prepareRawInputData, prepareSelectedOptionsInputData} = require("../utility/dataSubmissionUtility");
const LAYOUTS = {
  CLI: "cli",
  LANG: "en"
};
async function initializeLayout(formDataJSON) {
  const formattedFormData = JSON.parse(formDataJSON);
  const cliLayout = formattedFormData.layouts.find((layout) => {
    const layoutType = layout.type;
    return layoutType === LAYOUTS["CLI"];
  });
  const questions = cliLayout.content;
  return sortBy(questions, [
    (question) => {
      return question.order;
    },
  ]);
}
async function initializeRendering(formDataJSON) {
  const layoutContents = await initializeLayout(formDataJSON);
  const formattedFormData = JSON.parse(formDataJSON);
  const currentContent = first(layoutContents);
  await renderContents({
    currentContent,
    layoutContents,
    formattedFormData,
  });
}



const renderContents = async ({
  currentContent,
  layoutContents,
  formattedFormData,
  previousSubmissionData,
}) => {
  const submissionData = previousSubmissionData ?? [];
  const dataId = currentContent.dataId;
  const contentDataDefinition = formattedFormData.dataDefinitions[dataId];
  const flowDefinition = formattedFormData.formFlow[dataId];
  const contentType = currentContent.type;
  const contentResponse = await promptContent({
    contentType,
    contentDataDefinition,
  });
  const submittedFormDataRes = await navigateToNext({
    flowDefinition,
    contentDataDefinition,
  contentType,
    submissionData,
    contentResponse,
  dataId,
  });
  console.log(submissionData)
  const nextContentId = submittedFormDataRes.nextDataPointId;
  const nextContent = find(layoutContents, (content) => {
    return content.dataId === nextContentId;
  });
  !!nextContent
    ? await renderContents({
        currentContent: nextContent,
        layoutContents,
        formattedFormData,
        previousSubmissionData: submissionData
      })
    : endRendering();
};
const endRendering = () => {
  console.log("We're done ! Thank you !");
};

const updateSubmissionData = async ({
flowDefinition, contentDataDefinition, contentType, submissionData, contentResponse, dataId
}) => {
  const options = contentDataDefinition.options;
  const answer = contentResponse[contentDataDefinition.name];
  const dataPointSubmission = {
    collectedDateTime: DateTime.utc(),
    collectedTimezone: DateTime.local().offset.toString(),
    receivedDateTime: DateTime.utc(),
    sourceQuestionId: dataId,
    configuredQuestionText: contentDataDefinition.questionText,
    displayedQuestionText: contentDataDefinition.questionText,
  rawInput: prepareRawInputData(contentType,answer),
  selectedOptions: prepareSelectedOptionsInputData(contentType,answer, options),
    formattedInput: DateTime.utc(),
    calculatedResult: null,
    metadata: {
      submissionPlatform: LAYOUTS["CLI"],
      submissionFormFactor: LAYOUTS["CLI"],
      language: LAYOUTS["LANG"],
    }
  };
  submissionData.push(dataPointSubmission);
  const updateSubmissionDataRes = await postCollectedData(submissionData, flowDefinition, contentDataDefinition, answer);
  return updateSubmissionDataRes;
};
const navigateToNext = async ({ flowDefinition, contentDataDefinition, contentType, submissionData, contentResponse, dataId }) => {
  return await updateSubmissionData({flowDefinition, contentDataDefinition, contentType, submissionData, contentResponse, dataId});
  };
module.exports = {
  initializeRendering
};