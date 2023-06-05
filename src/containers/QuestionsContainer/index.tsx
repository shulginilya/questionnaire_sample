import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import Question from '@/components/Question';
import { QuestionActionPayloadType } from '@/types';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectCount,
	mutateQuestion
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	const dispatch = useAppDispatch();
	const mutateQuestionDispatcher = (payload: QuestionActionPayloadType) => {
		dispatch(mutateQuestion(payload));
	};
	// detect the first unanswered question
	let isFirstUnansweredQuestionÍd: string | null = null;
	for (let i = 0; i < questions.length; i++) {
		const hashQuestion = questions[i];
		if (hashQuestion.value === null) {
			isFirstUnansweredQuestionÍd = hashQuestion.id;
			break;
		}
	}
	// render component
	return (
		<>
			<Header title="Questionnaire" />
			<section className={styles.questions_container}>
				{
					questions.map(q => <Question key={q.id} question={q} isFirstUnansweredQuestionÍd={isFirstUnansweredQuestionÍd} mutateQuestionDispatcher={mutateQuestionDispatcher} />)
				}
			</section>
			<ControlPanel />
		</>
	)
};

export default QuestionsContainer;
