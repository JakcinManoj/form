export type DataDefinition = {
  id: string;
  name: string;
  questionText: string;
  questionTextKey: string;
  reportingLabels: [{ key: string; value: string }];
  dataType: string;
  options?: Object[];
  validations: [];
};
