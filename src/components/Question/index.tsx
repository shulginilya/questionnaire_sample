import { useState } from 'react';
import { QuestionType } from '@/types';
import styles from './question.module.scss';

interface QuestionComponentType {
    question: QuestionType;
	isFirstUnansweredQuestion?: boolean;
};

const Question: React.FC<QuestionComponentType> = ({
    question,
	isFirstUnansweredQuestion
}) => {
	const isExpandedByDefault = isFirstUnansweredQuestion || false;
	// question is hidden in case if it is NOT answered and it is not the first unanswered question
	const isHidden = !isExpandedByDefault && question.value === null;
	const [isExpanded, setExpanded] = useState(isExpandedByDefault);
	const classValue = isExpanded ? `${styles.question} ${styles.question__expanded}` : styles.question;
	return (
		<>
			{
				!isHidden && (
					<div className={classValue}>
					</div>
				)
			}
		</>
	)
};

export default Question;
