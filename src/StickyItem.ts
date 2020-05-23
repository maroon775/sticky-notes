import {Component} from "./Component";
import {Draggable} from "./libs/Draggable";

export type StickyElement = HTMLElement;

type Position = {
    left: number
    top: number
}
type Size = {
    width: number
    height: number
}

export interface IStickyProps {
    index: number,
    contentComponent: Component<{}>
    position: Position
    size: Size

    onRemove?(id: number): boolean | void
}

export interface IStickyItem {
    id: number
    element: StickyElement
    position: Position
    size: Size
}

export class StickyItem<P extends IStickyProps> extends Component<P> implements IStickyItem {
    id: number;
    element: StickyElement;
    position!: Position;
    size!: Size;

    private dragManager: Draggable;

    onRemove() {
        // noinspection PointlessBooleanExpressionJS
        const canRemove = (this.props.onRemove && this.props.onRemove(this.id) !== false) || true;

        if (canRemove) {
            this.dragManager.detachEvents();
            this.element.remove();
        }
    };

    constructor(props: P) {
        super(props);
        this.id = Date.now();
        this.element = document.createElement('div');
        this.dragManager = new Draggable(this.element, {
            onStart: (position: Position): void => {
                this.element.classList.add('sticky-item_moved');
            },
            onMove: (position: Position): void => {
                this.position = position;
            },
            onEnd: (position: Position): void =>  {
                this.element.classList.remove('sticky-item_moved');
            }
        });
    }

    private renderHeader(): HTMLElement {
        const header = document.createElement('div');
        header.setAttribute('style', `
            background:#ccc;
            cursor: move;
        `);
        header.className = 'sticky-item__header';

        const buttonRemove = document.createElement('button');
        buttonRemove.className = 'sticky-item__buttonRemove';
        buttonRemove.innerHTML = 'Remove';
        buttonRemove.addEventListener('click', this.onRemove.bind(this));

        header.appendChild(buttonRemove);

        return header;
    }

    private renderContent(): HTMLElement {
        const stickyContent = document.createElement('div');
        stickyContent.className = 'sticky-item__content';

        const contentComponent = this.props.contentComponent.render();
        if (contentComponent) {
            stickyContent.appendChild(contentComponent);

            stickyContent.addEventListener('mousedown', (event: MouseEvent) => {
                event.stopPropagation();
            })
        }

        return stickyContent;
    }

    onChangePosition() {

    }

    setPosition(position: Position) {
        this.position = position;
        this.element.style.top = `${position.top}px`;
        this.element.style.left = `${position.left}px`;
    }


    onChangeSize() {

    }

    setSize(size: Size) {
        this.size = size;
        this.element.style.width = `${size.width}px`;
        this.element.style.height = `${size.height}px`;
    }

    render() {
        const header = this.renderHeader();
        const content = this.renderContent();

        this.element.setAttribute('data-sticky-id', String(this.id));
        this.element.className = 'sticky-item';

        this.element.setAttribute('style', `
            position: absolute;
            background: #AA9683;
            z-index: ${String(this.props.index)};
            min-width: ${this.props.size.width}px;
            min-height: ${this.props.size.height}px;
        `);
        this.setPosition(this.props.position);

        this.element.appendChild(header);
        this.element.appendChild(content);
    }
}
