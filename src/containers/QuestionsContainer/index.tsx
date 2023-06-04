import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	mutateQuestions,
	resetQuestions,
	selectCount,
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	console.log(questions);
	const dispatch = useAppDispatch();
	return (
		<>
			<Header title="Questionnaire" />
			<section className={styles.questions_container}>
			</section>
			<ControlPanel />
		</>
	)
};

export default QuestionsContainer;
