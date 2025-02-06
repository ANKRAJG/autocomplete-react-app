import './App.css';
import AutoCompleteSearchBar from './components/AutoCompleteSearchBar';
import { AutoCompleteProvider } from './providers/AutoCompleteProvider';

function App() {
  return (
    <div className="App">
      <AutoCompleteProvider>
        <AutoCompleteSearchBar />
      </AutoCompleteProvider>
    </div>
  );
}

export default App;
