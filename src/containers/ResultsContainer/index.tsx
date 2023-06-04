import { useAppSelector } from "@/appStore/hooks";
import {
	selectCount,
} from "@/appStore/reducers/questionsSlice";
import styles from './results_container.module.scss';

const ResultsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	console.log(questions);
	return (
		<section className={styles.results}>
		</section>
	)
};

export default ResultsContainer;
