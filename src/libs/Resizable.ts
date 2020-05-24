import {Size} from "../interfaces";

interface ResizableOptions {
    className?: string,

    onResize?(size: Size): void

    onStart?(size: Size): void

    onEnd?(size: Size): void
}

export class Resizable {
    private shifts: Size = {
        width: 0,
        height: 0
    };
    private size: Size = {
        width: 0,
        height: 0
    };

    private resizer!:HTMLElement;

    private resize = (event: MouseEvent) => {
        const width = this.shifts.width + event.clientX;
        const height = this.shifts.height + event.clientY;
        this.size = {width, height};
    };

    constructor(public element: HTMLElement, private options?: ResizableOptions) {
        this.options = this.options || {};

        const resizer = document.createElement('div');

        if(this.options.className) {
            resizer.className = this.options.className;
        }

        resizer.addEventListener('mousedown', this.mouseDownHandler);
        resizer.addEventListener('dragstart', this.preventHandler);

        this.resizer = resizer;
        this.element.appendChild(this.resizer);
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

        this.resize(event);
        this.onResize();
    };

    private mouseUpHandler = () => {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        this.onEnd();
    };

    private mouseDownHandler = (event: MouseEvent) => {
        this.shifts.width = parseInt(window.getComputedStyle(this.element).width, 10) - event.clientX;
        this.shifts.height = parseInt(window.getComputedStyle(this.element).height, 10) - event.clientY;

        this.resize(event);

        this.onStart();

        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    };


    public destroy() {
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        this.resizer.removeEventListener('mousedown', this.mouseDownHandler);
        this.resizer.removeEventListener('dragstart', this.preventHandler);
        this.resizer.remove();
    }

    private onStart() {
        if (this.options!.onStart) {
            this.options!.onStart(this.size);
        }
    }

    private onResize() {
        if (this.options!.onResize) {
            this.options!.onResize(this.size);
        }
    }

    private onEnd() {
        if (this.options!.onEnd) {
            this.options!.onEnd(this.size);
        }
    }
}
