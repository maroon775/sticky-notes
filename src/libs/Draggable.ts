function getElementCoords(elem: HTMLElement) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

interface Position {
    left: number
    top: number
}

interface DraggableOptions {
    onMove?(position: Position): void

    onStart?(position: Position): void

    onEnd?(position: Position): void
}

export class Draggable {
    private shifts:Position = {
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
        this.element.style.left = `${this.position.left}px`;
        this.element.style.top = `${this.position.top}px`;
    };

    constructor(public element: HTMLElement, private options?: DraggableOptions) {
        this.options = this.options || {};
        this.element.addEventListener('mousedown', this.mouseDownHandler);
        this.element.addEventListener('dragstart', this.dragstartHandler);
    }

    private dragstartHandler = () => (event: MouseEvent) => {
        event.preventDefault();
        return false;
    };

    private mouseMoveHandler = (event: MouseEvent) => {
        this.move(event);
        this.onMove();
    };

    private mouseUpHandler = () => {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        this.element.removeEventListener('mouseup', this.mouseUpHandler);
        this.onEnd();
    };

    private mouseDownHandler = (event: MouseEvent) => {
        const coords = getElementCoords(this.element);
        this.shifts.left = event.pageX - coords.left;
        this.shifts.top = event.pageY - coords.top;

        this.element.style.position = 'absolute';
        this.element.style.zIndex = '1000';

        this.move(event);

        this.onStart();

        document.addEventListener('mousemove', this.mouseMoveHandler);
        this.element.addEventListener('mouseup', this.mouseUpHandler);
    };


    public detachEvents() {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        this.element.removeEventListener('mouseup', this.mouseUpHandler);
        this.element.removeEventListener('mousedown', this.mouseDownHandler);
        this.element.removeEventListener('dragstart', this.dragstartHandler);
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
