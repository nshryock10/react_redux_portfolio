import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import BlockContainer from './Components/BlockContainer/BlockContainer';
import ExpandedBlock from './Components/ExpandedBlock/ExpandedBlock';
import { useSelector, useDispatch } from 'react-redux';
import { selectBlockSize } from './features/blocks/blocksSlice';
import { setSearchTerm } from './features/searchBar/searchBarSlice';

function App() {
  const dispatch = useDispatch();
  const blockSize = useSelector(selectBlockSize);
  
  const menuClick = (topic) => {
    dispatch(setSearchTerm(topic));
  }

  return (
    <div className="App">
      <div className="header">
        <nav>
            <h1>ReddLite</h1>
            <div className="drop-down">
              <h3>TOPICS</h3>
              <div className="drop-down-content">
                <p onClick={() => menuClick('News')}>News</p>
                <p onClick={() => menuClick('Sports')}>Sports</p>
                <p onClick={() => menuClick('entertainment')}>Entertainment</p>
              </div>
            </div>
        </nav>
      </div>
      <SearchBar />
      <br></br>
      <div className="blockContainer" >
        <BlockContainer />
      </div>
      {blockSize === 'large' && <ExpandedBlock /> }
    </div>
  );
}

export default App;
