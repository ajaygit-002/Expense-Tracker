import { ExpenseProvider } from './context/ExpenseContext';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <ExpenseProvider>
      <Dashboard />
    </ExpenseProvider>
  );
}

export default App;

