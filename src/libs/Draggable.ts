import {Position} from "../interfaces";

function getElementCoords(elem: HTMLElement) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

interface DraggableOptions {
    onMove?(position: Position): void

    onStart?(position: Position): void

    onEnd?(position: Position): void
}

export class Draggable {
    private shifts: Position = {
        left: 0,
        top: 0
    };
    private position: Position = {
        left: 0,
        top: 0
    };

    private move = (event: MouseEvent) => {
        this.position = {
            left: (event.pageX - this.shifts.left),
            top: (event.pageY - this.shifts.top)
        };
    };

    constructor(public draggable: HTMLElement, public grabbed: HTMLElement, private options?: DraggableOptions) {
        this.options = this.options || {};
        this.grabbed.addEventListener('mousedown', this.mouseDownHandler);
        this.grabbed.addEventListener('dragstart', this.preventHandler);
    }

    private preventHandler = () => (event: MouseEvent) => {
        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
        return false;
    };

    private mouseMoveHandler = (event: MouseEvent) => {
        const selection = window.getSelection();
        if(selection) {
            selection.removeAllRanges()
        }

        this.move(event);
        this.onMove();
    };

    private mouseUpHandler = () => {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        this.grabbed.removeEventListener('mouseup', this.mouseUpHandler);
        this.onEnd();
    };

    private mouseDownHandler = (event: MouseEvent) => {
        const coords = getElementCoords(this.grabbed);
        this.shifts.left = event.pageX - coords.left;
        this.shifts.top = event.pageY - coords.top;

        this.move(event);

        this.onStart();

        document.addEventListener('mousemove', this.mouseMoveHandler);
        this.grabbed.addEventListener('mouseup', this.mouseUpHandler);
    };


    public destroy() {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        this.grabbed.removeEventListener('mouseup', this.mouseUpHandler);
        this.grabbed.removeEventListener('mousedown', this.mouseDownHandler);
        this.grabbed.removeEventListener('dragstart', this.preventHandler);
    }

    private onStart() {
        if (this.options!.onStart) {
            this.options!.onStart(this.position);
        }
    }

    private onMove() {
        if (this.options!.onMove) {
            this.options!.onMove(this.position);
        }
    }

    private onEnd() {
        if (this.options!.onEnd) {
            this.options!.onEnd(this.position);
        }
    }
}
