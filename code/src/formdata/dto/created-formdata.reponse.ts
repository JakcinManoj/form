import { FormData } from "../entities/formdata.entity";

export type SubmittedFormDataResponse = {
  submittedFormData: FormData [];
  nextDataPointId: string;
}
