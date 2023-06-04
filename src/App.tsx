import QuestionsContainer from '@/containers/QuestionsContainer';
import ResultsContainer from '@/containers/ResultsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuestionsContainer />} />
				<Route path="/results" element={<ResultsContainer />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
