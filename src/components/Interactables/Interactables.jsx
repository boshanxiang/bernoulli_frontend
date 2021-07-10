// from https://codesandbox.io/s/xl4qqqn774?file=/src/styles.css:0-1005
// wrapper components: https://www.digitalocean.com/community/tutorials/how-to-create-wrapper-components-in-react-with-props

import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";

import interact from "interactjs";

export const draggableOptions = {
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

export const resizableOptions = {
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

export default class Interactable extends Component {
  static defaultProps = {
    draggable: false,
    dropzone: false,
    resizable: false,
    draggableOptions: {},
    // dropzoneOptions: {},
    resizableOptions: {},
    drawLines: () => {}
  };

  render() {
    return cloneElement(this.props.children, {
      ref: node => (this.node = node),
      draggable: false
    });
  }

  componentDidMount() {
    this.interact = interact(findDOMNode(this.node));
    this.setInteractions();
  }

  componentWillReceiveProps() {
    this.interact = interact(findDOMNode(this.node));
    this.setInteractions();
  }

  setInteractions() {
    if (this.props.draggable) {
      this.interact.draggable(this.props.draggableOptions)
    }

    if (this.props.dropzone) {
        this.interact.dropzone(
          {
            accept: '.draggable, .drag-item',
            overlap: 'pointer',
            ondrop: (event) => {
                event.target.classList.add('drop-activated');
                event.relatedTarget.classList.add('drop-activated');
                this.props.drawLines(event.target.id, event.relatedTarget.id);
            }
        })
    }

    if (this.props.resizable) {
      this.interact.resizable(this.props.resizableOptions)
    }
  }
}

Interactable.propTypes = {
  children: PropTypes.node.isRequired,
  draggable: PropTypes.bool,
  draggableOptions: PropTypes.object,
  dropzone: PropTypes.bool,
  // dropzoneOptions: PropTypes.object,
  resizable: PropTypes.bool,
  resizableOptions: PropTypes.object,
  drawLines: PropTypes.func,
};

