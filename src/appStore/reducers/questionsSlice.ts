import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/appStore/store";
import { generateUniqueId } from '@/utils/commonUtils';
import {
    QuestionTypes,
    initialStateType,
    QuestionActionPayloadType,
    QuestionType
} from '@/types';

const questionsData: QuestionType[] = [
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
                message: "Your name must not be shorter than 3 characters.",
                digitsLimitation: 3
            },
            {
                type: "max",
                message: "Your name must not be longer than 25 characters.",
                digitsLimitation: 25
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
                message: "Your number must be not shorter than 7.",
                digitsLimitation: 7
            },
            {
                type: "max",
                message: "Your number must not longer than 12.",
                digitsLimitation: 12
            },
            {
                type: "numbersOnly",
                message: "Your answer must be only digits"
            }
        ]
    }
];

const initialState: initialStateType = {
    currentlyOpenedQuestionId: questionsData[0].id,
    previouslyOpenedQuestionId: '',
    questions: questionsData
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        mutateQuestion: (state, action: PayloadAction<QuestionActionPayloadType>) => {
            const { id, mutateObject } = action.payload;
            const questionIndex = state.questions.findIndex(q => q.id === id);
            if (questionIndex > -1) {
                state.questions[questionIndex] = Object.assign({}, state.questions[questionIndex], mutateObject);
            }
        },
        reset: (state) => {
            const resetQuestions = state.questions.map(q => {
                const valueObject = {
                    value: null
                };
                return { ...q, ...valueObject};
            });
            state.questions = resetQuestions;
        },
        mutatePreviouslyOpenedQuestionId: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.previouslyOpenedQuestionId = id;
        },
    } 
});

export const {
    mutateQuestion,
    reset,
    mutatePreviouslyOpenedQuestionId,
} = questionsSlice.actions;

export const selectQuestions = (state: RootState) => state.counter.questions;
export const selectCurrentOpenQuestion = (state: RootState) => state.counter.currentlyOpenedQuestionId;
export const selectPreviouslyOpenQuestion = (state: RootState) => state.counter.previouslyOpenedQuestionId;

export default questionsSlice.reducer;
