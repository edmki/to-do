import { GlobalStyle, H1 } from './App.styles';
import TaskList from './components/TaskList';
import { getInitialTasks } from './utils';

function App() {
	return (
		<div className="App">
			<GlobalStyle />
			<H1>Todos</H1>
			<TaskList initialTasks={getInitialTasks()}/>
		</div>
	);
}

export default App;