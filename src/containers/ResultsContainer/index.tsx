import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import { useAppSelector } from "@/appStore/hooks";
import {
	selectCount,
} from "@/appStore/reducers/questionsSlice";
import styles from './results_container.module.scss';

const ResultsContainer: React.FC = () => {
	const questions = useAppSelector(selectCount);
	console.log(questions);
	return (
		<>
			<Header title="Questionnaire reults" />
			<section className={styles.results}>
			</section>
			<ControlPanel />
		</>
	)
};

export default ResultsContainer;
