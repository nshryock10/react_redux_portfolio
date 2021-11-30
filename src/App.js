import './App.css';
import * as Icon from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from './Components/SearchBar/SearchBar';
import BlockContainer from './Components/BlockContainer/BlockContainer';
import ExpandedBlock from './Components/ExpandedBlock/ExpandedBlock';
import { useSelector, useDispatch } from 'react-redux';
import { selectBlockSize } from './features/blocks/blocksSlice';
import { selectSearchLoading, fetchSearchResults } from './features/reddit/redditSlice';

function App() {
  const dispatch = useDispatch();
  const blockSize = useSelector(selectBlockSize);
  const isLoading = useSelector(selectSearchLoading);

  const handleTopicClick = searchTerm => {
    dispatch(fetchSearchResults(searchTerm));
  }

  return (
    <div className="App">
      <div className="header">
        <nav className="nav">
          <Icon.Reddit className="reddit-logo" />
          <h1>reddLite</h1>
          <div className="mobile-nav">
            <Icon.List className="mobile-menu-list"/>
            <ul className="dropdown">
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("aww")}>aww</li>
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("funny")}>funny</li>
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("pics")}>pics</li>
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("politics")}>politics</li>
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("news")}>news</li>
              <li className="mobile-menu-item"onClick={()=>handleTopicClick("sports")}>sports</li>
            </ul>
          </div>    
        </nav>
      </div>
      <body>      
        <SearchBar className="search-bar" />
        <br></br>
        <div className="topics-bar">
          <ul>
            <li onClick={()=>handleTopicClick("aww")} className="topic-name">aww</li>
            <li onClick={()=>handleTopicClick("funny")} className="topic-name">funny</li>
            <li onClick={()=>handleTopicClick("pics")} className="topic-name">pics</li>
            <li onClick={()=>handleTopicClick("politics")} className="topic-name">politics</li>
            <li onClick={()=>handleTopicClick("news")} className="topic-name">news</li>
            <li onClick={()=>handleTopicClick("sports")} className="topic-name">sports</li>
          </ul>
        </div>
        <div className="blockContainer" >
          {isLoading && <h3><Icon.Reddit className="reddit-logo App-logo" /></h3>}
          {!isLoading && <BlockContainer />}
        </div>
        {blockSize === 'large' && <ExpandedBlock /> }
      </body>
    </div>
  );
}

export default App;
