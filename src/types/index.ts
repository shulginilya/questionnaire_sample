export interface QuestionType {
    id: string;
    title: string;
    desc: string;
    type: QuestionTypes.text | QuestionTypes.radio | QuestionTypes.date | QuestionTypes.checkbox | QuestionTypes.select | QuestionTypes.number;
    options: GenericObjectType[] | [];
    value: QuestionValueType;
    enabled: boolean;
    validations: ValdationType;
};

export enum QuestionTypes {
    text = 'TEXT',
    radio = 'RADIO',
    date = 'DATE',
    checkbox = 'CHECKBOX',
    select = 'SELECT',
    number = 'NUMBER'
};

export interface initialStateType {
    questions: QuestionType[]
};

export interface QuestionActionPayloadType {
    id: string;
    mutateObject: GenericObjectType
};

export type QuestionValueType = string | ValueObjectType[] | null;

export interface ValueObjectType {
    key: string;
    text: string;
    selected: boolean;
};

interface GenericObjectType {
    [key: string]: any;
};

export type ValdationType = {
    type: 'min' | 'max' | 'numbersOnly';
    message: string;
    digitsLimitation?: number;
}[];
