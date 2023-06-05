export interface QuestionType {
    id: string;
    title: string;
    desc: string;
    type: QuestionTypes.text | QuestionTypes.radio | QuestionTypes.date | QuestionTypes.checkbox | QuestionTypes.select | QuestionTypes.number;
    options: OptionsObject[] | [];
    value: string | number | null;
    enabled: boolean;
    validations: ValidationObject[];
};

export enum QuestionTypes {
    text = 'TEXT',
    radio = 'RADIO',
    date = 'DATE',
    checkbox = 'CHECKBOX',
    select = 'SELECT',
    number = 'NUMBER'
};

interface ValidationObject {
    [key: string]: string | number;
};

interface OptionsObject {
    [key: string]: string | number;
};

export interface initialStateType {
    questions: QuestionType[]
};

export interface QuestionActionPayloadType {
    id: string;
    value: string | number | null;
};
