import styles from './header.module.scss';

interface HeaderType {
	title: string;
	restartQuestionnaire: () => void;
};

const Header: React.FC<HeaderType> = ({
	title,
	restartQuestionnaire
}) => (
	<header data-testid="header" className={styles.header}>
		<p className={styles.header__text}>{title}</p>
		<button
			onClick={restartQuestionnaire}
			className={styles.header__cta}
		>Reset Questionnaire</button>
	</header>
);

export default Header;
