import { drawLines } from "../Sandbox/Sandbox";

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
  
export const dropzoneOptions = {
    accept: '.draggable, .drag-item',
    overlap: 'pointer',
    ondrop: function(event) {
        event.target.classList.add('drop-activated');
        event.relatedTarget.classList.add('drop-activated');
        drawLines(event.target.id, event.relatedTarget.id);
    }
}