import {Component} from '../Component';
import * as styles from './Textarea.less';
import {Resizable} from "../libs/Resizable";
import {IStickyContent} from "./StickyContent";

interface Size {
    width: number
    height: number
}

export interface TextareaProps {
    resizable?: boolean
    maxWidth?: number
    maxHeight?: number

    minWidth?: number
    minHeight?: number
}

interface TextareaDefaultProps {
    minWidth?: number
    minHeight?: number
}

export class Textarea<P extends TextareaProps> extends Component<P> implements IStickyContent<P> {
    public static defaultProps: TextareaDefaultProps = {
        minWidth: 150,
        minHeight: 100
    };

    private size!: Size;
    private resizeManager?: Resizable;
    public element!: HTMLElement;

    constructor(props: P) {
        super(props);
        console.log('Textarea', this.props);
    }

    render() {
        const outer = document.createElement('div');

        this.element = document.createElement('textarea');
        this.element.className = styles.editor;
        outer.appendChild(this.element);

        if (this.props.resizable) {
            this.resizeManager = new Resizable(outer, {
                className: styles.resizer,
                onResize: this.setSize
            });
        }

        this.setSize({
            width: this.props.minWidth!,
            height: this.props.minHeight!,
        });


        return outer;
    }

    destroy() {
        if(this.resizeManager) {
            this.resizeManager.destroy();
        }
    }

    setSize = (size: Size) => {
        this.size = {
            width: Math.max(Math.min(size.width, this.props.maxWidth || Infinity), this.props.minWidth!),
            height: Math.max(Math.min(size.height, this.props.maxHeight || Infinity), this.props.minHeight!)
        };

        this.element.style.width = `${this.size.width}px`;
        this.element.style.height = `${this.size.height}px`;
    }
}
