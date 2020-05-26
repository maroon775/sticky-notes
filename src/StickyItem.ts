import {Component} from './Component';
import {Draggable} from './libs/Draggable';
import * as styles from './StickyItem.less';
import {IStickyContent, StickyContentProps} from "./StickyContent/StickyContent";

export type StickyElement = HTMLElement;

type Position = {
    left: number
    top: number
}

export interface IStickyItemProps {
    index: number
    contentComponent: IStickyContent<StickyContentProps>
    position?: Position

    onRemove?(id: number): boolean | void
}

export interface IStickyItem {
    id: number
    element: StickyElement
    position: Position
}

export class StickyItem<P extends IStickyItemProps> extends Component<P> implements IStickyItem {
    private dragManager!: Draggable;
    public static defaultProps = {
        position: {
            top: 0,
            left: 0
        }
    };
    public id: number;
    public element: StickyElement;
    public position!: Position;
    public content!: IStickyContent<StickyContentProps>;

    private onRemove() {
        const canRemove = (this.props.onRemove && this.props.onRemove(this.id) !== false) || true;

        if (canRemove) {
            this.destroy();
        }
    };

    constructor(props: P) {
        super(props);

        this.id = Date.now();
        this.content = this.props.contentComponent;
        this.element = document.createElement('div');
        this.setPosition(this.props.position!);
    }

    private renderHeader(): HTMLElement {
        const header = document.createElement('div');
        header.className = styles.stickyItem__header;

        const draggablePanel = document.createElement('div');
        draggablePanel.className = styles.stickyItem__draggable;
        header.appendChild(draggablePanel);

        this.dragManager = new Draggable(this.element, draggablePanel, {
            onStart: (): void => {
                this.element.classList.add(styles.stickyItem__moveStart);
                this.element.style.zIndex = String(this.props.index) + 1000
            },
            onMove: (position: Position): void => {
                this.setPosition(position);

                if (!this.element.classList.contains(styles.stickyItem__move))
                    this.element.classList.add(styles.stickyItem__move);
            },
            onEnd: (): void => {
                this.element.classList.remove(styles.stickyItem__moveStart);
                this.element.classList.remove(styles.stickyItem__move);
                this.element.style.zIndex = String(this.props.index)
            }
        });

        const buttonRemove = document.createElement('button');
        buttonRemove.className = styles.stickyItem__remove;
        buttonRemove.innerHTML = 'Remove';
        buttonRemove.addEventListener('click', this.onRemove.bind(this));
        header.appendChild(buttonRemove);

        return header;
    }

    private renderContent(): HTMLElement {
        const stickyContent = document.createElement('div');
        stickyContent.className = styles.stickyItem__content;

        const content = this.content.render();
        if (content) {
            stickyContent.appendChild(content);
        }

        return stickyContent;
    }

    setPosition(position: Position) {
        this.position = position;
        this.element.style.top = `${this.position.top}px`;
        this.element.style.left = `${this.position.left}px`;
    }

    render() {
        const header = this.renderHeader();
        const content = this.renderContent();

        this.element.setAttribute('data-sticky-id', String(this.id));
        this.element.className = styles.stickyItem;
        this.element.style.zIndex = String(this.props.index);

        this.element.appendChild(header);
        this.element.appendChild(content);
    }

    disable = () => {
        this.element.setAttribute('disabled', 'disabled');
        this.content.disable();
    };

    enable = () => {
        this.element.removeAttribute('disabled');
        this.content.enable();
    };

    public destroy () {
        this.dragManager.destroy();
        this.content.destroy();
        this.element.remove();
    }
}
