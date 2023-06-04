import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import Question from '@/components/Question';
import { useAppSelector } from "@/appStore/hooks";
import {
	selectCount,
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	// detect the first unanswered question
	let isFirstUnansweredQuestion = false;
	for (let i = 0; i < questions.length; i++) {
		const hashQuestion = questions[i];
		if (hashQuestion.value === null) {
			isFirstUnansweredQuestion = true;
			break;
		}
	}
	// render component
	return (
		<>
			<Header title="Questionnaire" />
			<section className={styles.questions_container}>
				{
					questions.map(q => <Question key={q.id} question={q} isFirstUnansweredQuestion={isFirstUnansweredQuestion} />)
				}
			</section>
			<ControlPanel />
		</>
	)
};

export default QuestionsContainer;
