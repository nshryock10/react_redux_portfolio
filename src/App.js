import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import PreviewBlock from './Components/PreviewBlock/PreviewBlock';
import ExpandedBlock from './Components/ExpandedBlock/ExpandedBlock';
import { useState } from 'react';

function App() {

  const [expanded, setExpanded] = useState('small');

  return (
    <div className="App">
      <nav>
        <h1>ReddLite</h1>
      </nav>
      <SearchBar />
      <br></br>
      <div>
        {expanded === 'small' && <PreviewBlock expandBlock={() => setExpanded('large')} />}
        {expanded === 'large' && <ExpandedBlock closeBlock={()=>setExpanded('small') } />}
      </div>
    </div>
  );
}

export default App;
