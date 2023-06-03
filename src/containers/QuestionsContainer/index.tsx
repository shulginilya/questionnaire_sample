import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	incrementByAmount,
	selectCount,
} from "@/appStore/reducers/demoSlice";
import styles from './questions_container.module.scss';

const QuestionsContainer: React.FC = () => {
	const value = useAppSelector(selectCount);
	const dispatch = useAppDispatch();
	return (
		<section className={styles.questions_container}>
			{value}
			<button onClick={() => dispatch(incrementByAmount(4))}>Incremenet</button>
		</section>
	)
};

export default QuestionsContainer;
