import { useEffect, useState } from 'react';
import {
	QuestionActionPayloadType,
	QuestionTypes,
	QuestionType,
	QuestionValueType
} from '@/types';
import styles from './question.module.scss';

interface QuestionComponentType {
    question: QuestionType;
	isFirstUnansweredQuestionÍd: string | null;
	mutateQuestionDispatcher: ({id, mutateObject}: QuestionActionPayloadType) => void;
};

const Question: React.FC<QuestionComponentType> = ({
    question,
	isFirstUnansweredQuestionÍd,
	mutateQuestionDispatcher
}) => {
	/*
		We set a local state
	*/
	const [isExpanded, setExpanded] = useState<boolean>(false);
	const [localQuestion, setLocalQuestion] = useState<QuestionType>(question);
	/*
		We change question collapsability
	*/
	useEffect(() => {
		const isExpandedByDefault = (isFirstUnansweredQuestionÍd === question.id) || false;
		setExpanded(isExpandedByDefault);
	}, [isFirstUnansweredQuestionÍd]);
	/*
		Submit and cancel question handlers
	*/
	const submitQuestion = () => {
		mutateQuestionDispatcher({
			id: question.id,
			mutateObject: {
				value: localQuestion.value
			}
		});
	};
	const cancelQuestion = () => {
		mutateQuestionDispatcher({
			id: question.id,
			mutateObject: {
				value: null
			}
		});
	};
	/*
		Update local question copy
	*/
	// const updateQuestionValue = (event: React.SyntheticEvent) => {
	// 	console.log('updateQuestionValue');
	// 	const targetElement = event.target as HTMLFormElement;
    //     const value = targetElement.value;
	// 	// const valueCopy = [...question.value];
	// 	// valueCopy.push(value);
	// 	// console.log('newQuestion: ', valueCopy);
	// 	// const updatedValueObject = {
	// 	// 	value: valueCopy
	// 	// };
	// 	// const updatedLocalQuestion = Object.assign({}, localQuestion, updatedValueObject);
	// 	setLocalQuestion((prevState: QuestionType) => {
	// 		const valueCopy = [...prevState.value];
	// 		valueCopy.push(value);
	// 		console.log('valueCopy: ', valueCopy);
	// 		const updatedValueObject = {
	// 			value: valueCopy
	// 		};
	// 		return Object.assign({}, prevState, updatedValueObject);
	// 	});
	// };
	const updateQuestionValue = (event: React.SyntheticEvent) => {
		const targetElement = event.target as HTMLFormElement;
        const value = targetElement.value;
		setLocalQuestion((prevState: QuestionType) => {
			const updatedValueObject = {
				value
			};
			return Object.assign({}, prevState, updatedValueObject);
		});
	};
	/*
		Transform value to the string
	*/
	// const transformValue = (value: QuestionValueType) => {
	// 	if (value) {
	// 		return value.join(', ');
	// 	}
	// 	return '';
	// };
	/*
		Generate JKX per each question type
	*/
	const generateAnswerOption = () => {
		switch(question.type) {
			case QuestionTypes.text: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_text}`}>
						<input
							className={styles.question_type_text__input}
							type='text'
							defaultValue={question.value || ''}
							onChange={(e) => updateQuestionValue(e)}
						/>
					</div>
				);
			}
			case QuestionTypes.checkbox: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_checkbox}`}>
						{
							question.options.map((option) => (
								<div
									key={option.key}
									className={styles.question_type_checkbox__block}
								>
									<input
										className={styles.question_type_checkbox__block__input}
										id={`${question.id}_${option.key}`}
										value={option.text}
										onChange={(e) => updateQuestionValue(e)}
										type="checkbox"
									/>
									<label
										className={styles.question_type_checkbox__block__label}
										htmlFor={`${question.id}_${option.key}`}
										key={option.key}
									>
										{option.text}
									</label>
								</div>
							))
						}
					</div>
				);
			}
			case QuestionTypes.date: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_text}`}>
						<input
							className={styles.question_type_text__input}
							type='date'
							defaultValue={question.value || ''}
							onChange={(e) => updateQuestionValue(e)}
						/>
					</div>
				);
			}
			case QuestionTypes.number: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_text}`}>
						<input
							className={styles.question_type_text__input}
							type='number'
							defaultValue={question.value || ''}
							onChange={(e) => updateQuestionValue(e)}
						/>
					</div>
				);
			}
			case QuestionTypes.radio: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_radio}`}>
						{
							question.options.map((option) => (
								<div
									key={option.key}
									className={styles.question_type_radio__block}
								>
									<input
										className={styles.question_type_radio__block__input}
										id={`${question.id}_${option.key}`}
										name={`${question.id}_radio`}
										value={option.text}
										onChange={(e) => updateQuestionValue(e)}
										type="radio"
									/>
    								<label
										className={styles.question_type_radio__block__label}
										key={option.key}
										htmlFor={`${question.id}_${option.key}`}
									>{option.text}</label>
								</div>
							))
						}
					</div>
				);
			}
			case QuestionTypes.select: {
				return (
					<div
						className={`${styles.question_type} ${styles.question_type_select}`}
					>
						<select 
							className={styles.question_type_select__input}
							onChange={(e) => updateQuestionValue(e)}
						>
							{
								question.options.map((option) => (
									<option key={option.key} value={option.key}>{option.text}</option>
								))
							}
						</select>
					</div>
				);
			}
			default: null;
		}
	};
	/*
		Define if question is completely hidden or not
	*/
	// question is hidden in case if it is NOT answered and it is not the first unanswered question
	// const isHidden = !isExpandedByDefault && question.value === null;
	const isHidden = false;
	/*
		Define the classs which indicates if question is answered or not
	*/
	const signClassValue = question.value ? `${styles.question__preview__sign} ${styles.question__preview__sign_answered}` : styles.question__preview__sign;
	/*
		Render component
	*/
	return (
		<>
			{
				!isHidden && (
					<div className={styles.question}>
						{
							isExpanded ? (
								<div className={styles.question__content}>
									<div className={styles.question__content__title}>
										<p className={styles.question__content__title__text}>{question.title}</p>
										<button
											className={styles.question__content__title__cnt}
											onClick={() => setExpanded(!isExpanded)}
										>Close</button>
									</div>
									<p className={styles.question__content__desc}>{question.desc}</p>
									<div className={styles.question__content__question_body}>{generateAnswerOption()}</div>
									<div className={styles.question__content__cta}>
										<button onClick={() => submitQuestion()} className={styles.question__content__cta__btn}>{question.value ? 'Edit' : 'Submit'}</button>
										<button onClick={() => cancelQuestion()} className={`${styles.question__content__cta__btn} ${styles.question__content__cta__btn_transparent}`}>Cancel</button>
									</div>
								</div>
							) : (
								<div className={styles.question__preview} onClick={() => setExpanded(!isExpanded)}>
									<span className={styles.question__preview__title}>{question.title}</span>
									<span className={styles.question__preview__answer}>{question.value}</span>
									<span className={signClassValue}></span>
								</div>
							)
						}
					</div>
				)
			}
		</>
	)
};

export default Question;
