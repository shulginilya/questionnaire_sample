import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	mutateQuestions,
	selectCount,
} from "@/appStore/reducers/questionsSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	console.log(questions);
	const dispatch = useAppDispatch();
	return (
		<section className={styles.questions_container}>
		</section>
	)
};

export default QuestionsContainer;
