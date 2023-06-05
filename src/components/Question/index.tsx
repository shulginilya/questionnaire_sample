import { useState } from 'react';
import { QuestionType } from '@/types';
import { QuestionActionPayloadType } from '@/types';
import styles from './question.module.scss';

interface QuestionComponentType {
    question: QuestionType;
	isFirstUnansweredQuestionÍd: string | null;
	mutateQuestionDispatcher: ({id, value}: QuestionActionPayloadType) => void;
};

const Question: React.FC<QuestionComponentType> = ({
    question,
	isFirstUnansweredQuestionÍd,
	mutateQuestionDispatcher
}) => {
	const submitQuestion = () => {
		mutateQuestionDispatcher({
			id: question.id,
			value: questionValue
		});
	};
	const cancelQuestion = () => {
		mutateQuestionDispatcher({
			id: question.id,
			value: null
		});
	};
	const isExpandedByDefault = (isFirstUnansweredQuestionÍd === question.id) || false;
	// question is hidden in case if it is NOT answered and it is not the first unanswered question
	const isHidden = !isExpandedByDefault && question.value === null;
	const [isExpanded, setExpanded] = useState<boolean>(isExpandedByDefault);
	const [questionValue, setQuestionValue] = useState<string | number | null>(question.value);
	const signClassValue = question.value ? `${styles.question__preview__sign} ${styles.question__preview__sign_answered}` : styles.question__preview__sign;
	return (
		<>
			{
				!isHidden && (
					<div className={styles.question} onClick={() => setExpanded(!isExpanded)}>
						{
							isExpanded ? (
								<div className={styles.question__content}>
									<p className={styles.question__content__title}>{question.title}</p>
									<p className={styles.question__content__desc}>{question.desc}</p>
									<div className={styles.question__content__question_body}>body</div>
									<div className={styles.question__content__cta}>
										<button onClick={() => submitQuestion()} className={styles.question__content__cta__btn}>{question.value ? 'Edit' : 'Submit'}</button>
										<button onClick={() => cancelQuestion()} className={`${styles.question__content__cta__btn} ${styles.question__content__cta__btn_transparent}`}>Cancel</button>
									</div>
								</div>
							) : (
								<div className={styles.question__preview}>
									<span className={styles.question__preview__title}>{question.title}</span>
									<span className={styles.question__preview__answer}>{question.value || ''}</span>
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
