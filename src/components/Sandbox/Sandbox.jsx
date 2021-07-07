import {Component} from 'react';
import Interactable from '../Interactables/Interactables'

import "../styles.css";

const draggableOptions = {
  onmove: event => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";

    // update the posiion attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
};

const resizableOptions = {
  edges: { top: true, left: true, bottom: true, right: true },
  listeners: {
    move: function (event) {
      let { x, y } = event.target.dataset

      x = (parseFloat(x) || 0) + event.deltaRect.left
      y = (parseFloat(y) || 0) + event.deltaRect.top

      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`
      })

      Object.assign(event.target.dataset, { x, y })
    }
  }
}


class Sandbox extends Component {
  constructor(props) {
    super(props)
    this.state = {

      droppedItems: []

    }

    this.handleDrop = this.handleDrop.bind(this);

  }
  handleDrop(event) {
    console.log("DROP", event);
  }

  render() {

    return (
      <div className="App">
        {this.props.legal_entities.map((legal_entity) => {
          return(
            <Interactable draggable={true} draggableOptions={draggableOptions} resizable={true} resizableOptions={resizableOptions} key={legal_entity.id}>
              <div className="draggable drag-item">
                <p>Legal Entity Name: {legal_entity.entity_name}</p>
                <p>Legal Entity Type: {legal_entity.entity_type}</p>
                <p>State of Formation: {legal_entity.state_of_formation}</p>
              </div>
            </Interactable>
          )
        })}
      </div>
    )
  }
}

export default Sandbox;
