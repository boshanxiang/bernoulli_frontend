import {Component} from 'react'

import "../styles.css";

const baseURL = 'http://localhost:8000/'

class NavPanel extends Component {

    render() {
        
        return (
        <div className="list_container">
                  legal_entities: [],
      natural_persons: [],
      equity_classes: [],
      equity_tokens: [],
      employment_relations: [],
      officer_relations: [],
      director_relations: [],
        </div>
        )
    }
}

export default NavPanel