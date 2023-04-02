import { Injectable, Logger } from '@nestjs/common';
import { CreateFormDataInput } from './dto/create-formdata.input';
//@ts-ignore
import { findNextDataPointId } from 'fullforms_logic_library';
import { DataDefinitionInput } from './dto/dataDefinition.input';
import { FormFlowInput } from './dto/formFlow.input';
import { SubmittedFormDataResponse } from './dto/created-formdata.reponse';
import * as _ from 'lodash';
import { FormData } from './entities/formdata.entity';

@Injectable()
export class FormDataService {
  async create(
    createFormDataInput: CreateFormDataInput[],
    formFlowInput: FormFlowInput,
    dataDefinitionInput: DataDefinitionInput,
    userInput: Object
  ): Promise<SubmittedFormDataResponse> {
    const nextDataPointId = await findNextDataPointId(
      formFlowInput,
      dataDefinitionInput,
      userInput
    );

    Logger.log('Submitted form data', createFormDataInput);

    Logger.log('Next data point id', nextDataPointId);

    const formSubmissions: SubmittedFormDataResponse = {
      nextDataPointId: nextDataPointId,
      submittedFormData: []
    };

    createFormDataInput.forEach(formData=>{
      formSubmissions.submittedFormData.push(formData)
    })
    return formSubmissions;
  }
}
