import Header from '@/components/Header';
import Question from '@/components/Question';
import { QuestionActionPayloadType } from '@/types';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectQuestions,
	mutateQuestion,
	reset
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectQuestions);
	const dispatch = useAppDispatch();
	/*
		We define question mutators (reset whole app and mutate questions)
	*/
	const mutateQuestionDispatcher = (payload: QuestionActionPayloadType) => {
		dispatch(mutateQuestion(payload));
	};
	const restartQuestionnaire = () => {
		dispatch(reset());
	};
	/*
		Detect the first unanswered question
	*/
	let isFirstUnansweredQuestionÍd: string | null = null;
	for (let i = 0; i < questions.length; i++) {
		const hashQuestion = questions[i];
		if (hashQuestion.value === null) {
			isFirstUnansweredQuestionÍd = hashQuestion.id;
			break;
		}
	}
	/*
		Render component
	*/
	return (
		<>
			<Header
				title="Questionnaire"
				restartQuestionnaire={restartQuestionnaire}
			/>
			<section className={styles.questions_container}>
				{
					questions.map(q => <Question key={q.id} question={q} isFirstUnansweredQuestionÍd={isFirstUnansweredQuestionÍd} mutateQuestionDispatcher={mutateQuestionDispatcher} />)
				}
			</section>
		</>
	)
};

export default QuestionsContainer;
