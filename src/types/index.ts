export interface QuestionType {
    id: string;
    title: string;
    desc: string;
    type: QuestionTypes.text | QuestionTypes.radio | QuestionTypes.date | QuestionTypes.checkbox | QuestionTypes.select | QuestionTypes.number;
    options: GenericObjectType[] | [];
    value: QuestionValueType;
    enabled: boolean;
    validations: GenericObjectType[];
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

// export type QuestionValueType = string[] | number[] | [];

export type QuestionValueType = string | number | null;

interface GenericObjectType {
    [key: string]: any;
};
