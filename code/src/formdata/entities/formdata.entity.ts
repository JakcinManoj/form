import { MetaData } from "./metadata.entity";
import { SelectedOption } from "./selectedoption.entity";

export class FormData {
  collectedDateTime: string;
  collectedTimezone: string;
  receivedDateTime: string;
  sourceQuestionId: string;
  configuredQuestionText: string;
  displayedQuestionText: string;
  rawInput: string | number | boolean | Date;
  selectedOptions: SelectedOption[];
  formattedInput: string | number | boolean | Date;
  calculatedResult: string | number | boolean | Date;;
  metadata: MetaData;
}
