import Header from '@/components/Header';
import Question from '@/components/Question';
import { QuestionActionPayloadType } from '@/types';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectQuestions,
	mutateQuestion,
	reset,
	selectCurrentOpenedQuestionId,
	selectPreviouslyOpenedQuestionId
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectQuestions);
	const currentlyOpenedQuestionId = useAppSelector(selectCurrentOpenedQuestionId);
	const previouslyOpenedQuestionId = useAppSelector(selectPreviouslyOpenedQuestionId);
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
					questions.map(q =>
						<Question
							key={q.id}
							question={q}
							currentlyOpenedQuestionId={currentlyOpenedQuestionId}
							previouslyOpenedQuestionId={previouslyOpenedQuestionId}
							mutateQuestionDispatcher={mutateQuestionDispatcher}
						/>
					)
				}
			</section>
		</>
	)
};

export default QuestionsContainer;
