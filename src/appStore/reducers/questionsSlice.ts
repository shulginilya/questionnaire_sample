import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/appStore/store";
import { generateUniqueId } from '@/utils/commonUtils';
import { QuestionType, QuestionTypes, ValueObject } from '@/types';

interface initialStateType {
    questions: QuestionType[]
};

interface QuestionActionPayloadType {
    id: string;
    value: ValueObject;
};

const initialState: initialStateType = {
    questions: [
        {
            id: generateUniqueId(),
            title: 'What is your name?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.text,
            options: [],
            value: null,
            enabled: true,
            validations: [
                {
                    type: "min",
                    message: "Your name must not be shorter than 3 characters."
                },
                {
                    type: "max",
                    message: "Your name must not be longer than 25 characters."
                }
            ]
        },
        {
            id: generateUniqueId(),
            title: 'What is your gender?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.radio,
            options: [
                {
                    key: "FEMALE",
                    text: "Female"
                },
                {
                    key: "MALE",
                    text: "Male"
                },
                {
                    key: "OTHER",
                    text: "Other"
                }
            ],
            value: null,
            enabled: true,
            validations: []
        },
        {
            id: generateUniqueId(),
            title: 'What is your the date of your birth?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.date,
            options: [],
            value: null,
            enabled: true,
            validations: []
        },
        {
            id: generateUniqueId(),
            title: 'What insurances do you have?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.checkbox,
            options: [
                {
                    key: "HEALTH",
                    text: "Health"
                },
                {
                    key: "LIABILITY",
                    text: "Liability"
                },
                {
                    key: "LEGAL",
                    text: "Legal"
                },
                {
                    key: "CAR",
                    text: "Car"
                }
            ],
            value: null,
            enabled: true,
            validations: []
        },
        {
            id: generateUniqueId(),
            title: 'What is your employment status?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.select,
            options: [
                {
                    key: "EMPLOYEE",
                    text: "Employee"
                },
                {
                    key: "BUSINESS_OWNER",
                    text: "Business Owner"
                },
                {
                    key: "HOUSE_SPOUSE",
                    text: "Housewife / Househusband"
                },
                {
                    key: "RETIREE",
                    text: "Retiree"
                },
                {
                    key: "STUDENT",
                    text: "Student"
                },
                {
                    key: "SELF_EMPLOYED",
                    text: "Self-Employed"
                },
                {
                    key: "UNEMPLOYED",
                    text: "Unemployed"
                }
            ],
            value: null,
            enabled: true,
            validations: []
        },
        {
            id: generateUniqueId(),
            title: 'What is your phone number?',
            desc: 'a paragraph of random text...!',
            type: QuestionTypes.number,
            options: [],
            value: null,
            enabled: true,
            validations: [
                {
                    type: "min",
                    message: "Your number must be only digits and not shorter than 7."
                },
                {
                    type: "max",
                    message: "Your number must be only digits and not longer than 12."
                }
            ]
        }
    ]
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        mutateQuestions: (state, action: PayloadAction<QuestionActionPayloadType>) => {
            state.questions = { ...state.questions , ...action.payload};
            // const { id, value } = action.payload;
            // const mutateIndex = state.questions.findIndex(s => s.id === id);
            // if (mutateIndex > -1) {
            //     // @ts-ignore
            //     state.questions[mutateIndex].value = value;
            // }
        },
        resetQuestions: (state) => {
            state.questions = state.questions.map(s => {
                const resetValueObject = {
                    value: null
                };
                return { ...s, ...resetValueObject };
            });
        }
    }
});

export const { mutateQuestions, resetQuestions } = questionsSlice.actions;

export const selectCount = (state: RootState) => state.counter.questions;

export default questionsSlice.reducer;
