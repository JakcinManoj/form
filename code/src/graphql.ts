
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateFormDataInput {
    collectedDateTime?: Nullable<string>;
    collectedTimezone?: Nullable<string>;
    receivedDateTime?: Nullable<string>;
    sourceQuestionId?: Nullable<string>;
    configuredQuestionText?: Nullable<string>;
    displayedQuestionText?: Nullable<string>;
    rawInput?: Nullable<Object>;
    selectedOptions?: Nullable<Nullable<SelectedOptionInput>[]>;
    formattedInput?: Nullable<Object>;
    calculatedResult?: Nullable<Object>;
    metadata?: Nullable<MetaDataInput>;
}

export interface SelectedOptionInput {
    key?: Nullable<string>;
    value?: Nullable<Object>;
    textShownToUser?: Nullable<string>;
}

export interface MetaDataInput {
    submissionPlatform?: Nullable<string>;
    submissionFormFactor?: Nullable<string>;
    language?: Nullable<string>;
}

export interface FormFlowInput {
    edges?: Nullable<Nullable<EdgeInput>[]>;
}

export interface EdgeInput {
    id?: Nullable<number>;
    conditions?: Nullable<Object>;
    event?: Nullable<Object>;
    next?: Nullable<string>;
}

export interface DataDefinitionInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    questionText?: Nullable<string>;
    questionTextKey?: Nullable<string>;
    reportingLabels?: Nullable<Nullable<ReportingLabelInput>[]>;
    dataType?: Nullable<string>;
    options?: Nullable<Nullable<Object>[]>;
    validations?: Nullable<Nullable<Object>[]>;
}

export interface ReportingLabelInput {
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export interface SubmittedFormDataResponse {
    submittedFormData?: Nullable<Nullable<FormData>[]>;
    nextDataPointId?: Nullable<string>;
}

export interface FormData {
    collectedDateTime?: Nullable<string>;
    collectedTimezone?: Nullable<string>;
    receivedDateTime?: Nullable<string>;
    sourceQuestionId?: Nullable<string>;
    configuredQuestionText?: Nullable<string>;
    displayedQuestionText?: Nullable<string>;
    rawInput?: Nullable<Object>;
    selectedOptions?: Nullable<Nullable<SelectedOption>[]>;
    formattedInput?: Nullable<Object>;
    calculatedResult?: Nullable<Object>;
    metadata?: Nullable<MetaData>;
}

export interface SelectedOption {
    key?: Nullable<string>;
    value?: Nullable<Object>;
    textShownToUser?: Nullable<string>;
}

export interface MetaData {
    submissionPlatform?: Nullable<string>;
    submissionFormFactor?: Nullable<string>;
    language?: Nullable<string>;
}

export interface IMutation {
    createFormData(createFormDataInput: CreateFormDataInput[], formFlowInput?: Nullable<FormFlowInput>, dataDefinitionInput?: Nullable<DataDefinitionInput>, userInput?: Nullable<Object>): Nullable<SubmittedFormDataResponse> | Promise<Nullable<SubmittedFormDataResponse>>;
}

export interface IQuery {
    getFormData(): Nullable<string> | Promise<Nullable<string>>;
}

export type Object = any;
type Nullable<T> = T | null;
