import {Component} from 'react';
import Sandbox from '../Sandbox/Sandbox'
import NavPanel from '../NavPanel/NavPanel'
import {RecordsContext} from '../Context/RecordsContext'

const baseURL = 'http://localhost:8000/'

class App extends Component {

  render() {

    return (
      <RecordsContext.Provider>
        <NavPanel/>
        <Sandbox/>
      </RecordsContext.Provider>
    )
  }
}

export default App;
