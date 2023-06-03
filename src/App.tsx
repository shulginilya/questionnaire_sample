import QuestionsContainer from '@/containers/QuestionsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuestionsContainer />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
