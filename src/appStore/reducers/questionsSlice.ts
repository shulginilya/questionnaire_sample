import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/appStore/store";
import { generateUniqueId } from '@/utils/commonUtils';
import { QuestionType, QuestionTypes } from '@/types';

interface initialStateType {
    questions: QuestionType[]
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
        }
    ]
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        mutateQuestions: (state) => {
            console.log('hey');
            // state.value -= 1
            // state.value += action.payload
        }
    }
});

export const { mutateQuestions } = questionsSlice.actions;

export const selectCount = (state: RootState) => state.counter.questions;

export default questionsSlice.reducer;
