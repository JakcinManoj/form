const _ = require("lodash");

multiSelectInputhandler = (answers , options ) => {
  const selectedOptions = [];
  answers.forEach((answer) => {
    const findOption = options.filter(option => option.value === answer).find(option => option)
    const selectedOption =
    {
      ..._.pick(findOption, ["key", "value"]),
      textShownToUser: findOption.optionText,
    }
    selectedOptions.push(selectedOption);
  });
  return selectedOptions;
};
singleSelectInputhandler = (answer , options) => {
  const findOption = options.filter(option => option.value === answer).find(option => option)
  const selectedOptions = [
    {
      ..._.pick(findOption, ["key", "value"]),
      textShownToUser: findOption.optionText,
    }
  ];
  return selectedOptions;
};
textInputhandler = (answer) => {
  return answer;
};
const prepareRawInputData = (contentType, answer) => {
  const handlerMap = {
    text: () => {
      return textInputhandler(answer);
    },
    number: () => {
      return textInputhandler(answer);
    },
    confirm: () => {
      return textInputhandler(answer);
    },
    password: () => {
      return textInputhandler(answer);
    },
  };
  return handlerMap[contentType] ? handlerMap[contentType](answer) : null;
};
const prepareSelectedOptionsInputData = (contentType, answer , options) => {
  const handlerMap = {
    list: () => {
      return singleSelectInputhandler(answer , options);
    },
    checkbox: () => {
      return multiSelectInputhandler(answer , options);
    },
  };
  return handlerMap[contentType]
    ? handlerMap[contentType](answer , options)
    : null;
};
module.exports = { prepareRawInputData, prepareSelectedOptionsInputData };