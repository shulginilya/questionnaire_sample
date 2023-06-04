import QuestionsContainer from '@/containers/QuestionsContainer';
import ResultsContainer from '@/containers/ResultsContainer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuestionsContainer />} />
				<Route path="/results" element={<ResultsContainer />} />
			</Routes>
		</BrowserRouter>
		<Footer />
	</>
);

export default App;
