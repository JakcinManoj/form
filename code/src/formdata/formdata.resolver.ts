import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FormDataService } from './formdata.service';
import { CreateFormDataInput } from './dto/create-formdata.input';
import { FormData } from './entities/formdata.entity';
import { FormFlowInput } from './dto/formFlow.input';
import { DataDefinitionInput } from './dto/dataDefinition.input';
import { SubmittedFormDataResponse } from './dto/created-formdata.reponse';

@Resolver('FormData')
export class FormDataResolver {
  constructor(private readonly formDataService: FormDataService) {}

  @Mutation('createFormData')
  async createFormData(
    @Args('createFormDataInput') createFormDataInput: CreateFormDataInput[],
    @Args('formFlowInput') formFlowInput: FormFlowInput,
    @Args('dataDefinitionInput')
    dataDefinitionInput: DataDefinitionInput,
    @Args('userInput')
    userInput: Object
  ): Promise<SubmittedFormDataResponse> {
    return await this.formDataService.create(
      createFormDataInput,
      formFlowInput,
      dataDefinitionInput,
      userInput
    );
  }
}
