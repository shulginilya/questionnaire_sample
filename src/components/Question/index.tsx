import { useEffect, useState } from 'react';
import {
	QuestionActionPayloadType,
	QuestionTypes,
	QuestionType,
	ValueObjectType,
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
			id: localQuestion.id,
			mutateObject: {
				value: localQuestion.value
			}
		});
	};
	const cancelQuestion = () => {
		mutateQuestionDispatcher({
			id: localQuestion.id,
			mutateObject: {
				value: null
			}
		});
	};
	/*
		Update local question copy
	*/
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
	const updateQuestionValueSelections = (event: React.SyntheticEvent, key: string, isMultiSelect: boolean = false) => {
		const targetElement = event.target as HTMLFormElement;
        const value = targetElement.value;
		setLocalQuestion((prevState: QuestionType) => {
			const valueObjectCopy = localQuestion.value ? JSON.parse(JSON.stringify(localQuestion.value)) : [];
			let updatedValueObject = {
				value: valueObjectCopy as ValueObjectType[]
			};
			if (isMultiSelect) {
				const cIndex = valueObjectCopy ? valueObjectCopy.findIndex((v: ValueObjectType) => v.key === key) : -1;
				if (cIndex > -1) {
					updatedValueObject.value[cIndex].selected = !updatedValueObject.value[cIndex].selected;
				} else {
					updatedValueObject.value.push({
						key,
						text: value,
						selected: true
					});
				}
			} else {
				updatedValueObject.value = [{
					key,
					text: value,
					selected: true
				}];
			}
			const newState = Object.assign({}, prevState, updatedValueObject);
			return newState;
		});
	};
	/*
		Generate JKX per each question type
	*/
	const generateAnswerOption = () => {
		switch(localQuestion.type) {
			case QuestionTypes.text: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_text}`}>
						<input
							className={styles.question_type_text__input}
							type='text'
							defaultValue={primitiveToDefaultValue()}
							onChange={(e) => updateQuestionValue(e)}
						/>
					</div>
				);
			}
			case QuestionTypes.checkbox: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_checkbox}`}>
						{
							localQuestion.options.map((option) => {
								const id = `${localQuestion.id}_${option.key}`;
								return (
									<div
										key={option.key}
										className={styles.question_type_checkbox__block}
									>
										<input
											className={styles.question_type_checkbox__block__input}
											id={id}
											value={option.text}
											checked={isChecked(option.key)}
											onChange={(e) => updateQuestionValueSelections(e, option.key, true)}
											type="checkbox"
										/>
										<label
											className={styles.question_type_checkbox__block__label}
											htmlFor={id}
											key={option.key}
										>
											{option.text}
										</label>
									</div>
								)
							})
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
							defaultValue={primitiveToDefaultValue()}
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
							defaultValue={primitiveToDefaultValue()}
							onChange={(e) => updateQuestionValue(e)}
						/>
					</div>
				);
			}
			case QuestionTypes.radio: {
				return (
					<div className={`${styles.question_type} ${styles.question_type_radio}`}>
						{
							localQuestion.options.map((option) => {
								const id = `${localQuestion.id}_${option.key}`;
								return (
									<div
										key={option.key}
										className={styles.question_type_radio__block}
									>
										<input
											className={styles.question_type_radio__block__input}
											id={id}
											name={`${localQuestion.id}_radio`}
											value={option.text}
											checked={isChecked(option.key)}
											onChange={(e) => updateQuestionValueSelections(e, option.key)}
											type="radio"
										/>
										<label
											className={styles.question_type_radio__block__label}
											key={option.key}
											htmlFor={id}
										>{option.text}</label>
									</div>
								)
							})
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
								localQuestion.options.map((option) => (
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
		Value transformer
	*/
	const isChecked = (key: string): boolean => {
		const valueObject = localQuestion.value;
		if (valueObject && typeof valueObject === 'object') {
			const cIndex = valueObject.findIndex(v => v.key === key);
			if (cIndex > -1) {
				return valueObject[cIndex].selected;
			}
			return false;
		}
		return false;
	};
	const primitiveToDefaultValue = (): string => {
		const valueObject = localQuestion.value;
		if (valueObject && typeof valueObject !== 'object') {
			return valueObject;
		}
		return '';
	};
	const valueObjectToText = (): string => {
		const valueObject = localQuestion.value;
		let tValue = '';
		if (valueObject === null) {
			return '';
		}
		if (typeof valueObject === 'object') {
			valueObject.forEach(v => {
				if (v.selected) {
					tValue += `${v.text}, `;
				}
			});
			return tValue.slice(0, -2);
		}
		return valueObject;
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
										<p className={styles.question__content__title__text}>{localQuestion.title}</p>
										<button
											className={styles.question__content__title__cnt}
											onClick={() => setExpanded(!isExpanded)}
										>Close</button>
									</div>
									<p className={styles.question__content__desc}>{localQuestion.desc}</p>
									<div className={styles.question__content__question_body}>{generateAnswerOption()}</div>
									<div className={styles.question__content__cta}>
										<button onClick={() => submitQuestion()} className={styles.question__content__cta__btn}>{question.value ? 'Edit' : 'Submit'}</button>
										<button onClick={() => cancelQuestion()} className={`${styles.question__content__cta__btn} ${styles.question__content__cta__btn_transparent}`}>Cancel</button>
									</div>
								</div>
							) : (
								<div className={styles.question__preview} onClick={() => setExpanded(!isExpanded)}>
									<span className={styles.question__preview__title}>{localQuestion.title}</span>
									<span className={styles.question__preview__answer}>{valueObjectToText()}</span>
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
