import { MetaDataInput } from "./metadata.input";
import { SelectedOptionInput } from "./selectedoption.input";

export type CreateFormDataInput = {

  collectedDateTime: string;
  collectedTimezone: string;
  receivedDateTime: string;
  sourceQuestionId: string;
  configuredQuestionText: string;
  displayedQuestionText: string;
  rawInput: string | number | boolean | Date;
  selectedOptions: SelectedOptionInput[];
  formattedInput: string | number | boolean | Date;
  calculatedResult: string | number | boolean | Date;
  metadata: MetaDataInput;

}
