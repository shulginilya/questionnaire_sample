import styles from './header.module.scss';

interface HeaderType {
	title: string;
};

const Header: React.FC<HeaderType> = ({
	title
}) => (
	<header data-testid="header" className={styles.header}>
		{title}
	</header>
);

export default Header;
