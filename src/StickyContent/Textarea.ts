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
    public editor!: HTMLTextAreaElement;
    public editorStatic!: HTMLElement;
    public element!: HTMLElement;

    public toString() {
        return this.editor.value;
    }

    constructor(props: P) {
        super(props);

        this.element = document.createElement('div');
        this.editorStatic = document.createElement('div');
        this.editor = document.createElement('textarea');
    }

    private syncEditors = () => {
        this.editorStatic.innerText = this.toString();
    };

    render() {
        this.editorStatic.className = styles.editorStatic;

        this.editor.className = styles.editor;
        this.editor.addEventListener('keyup', this.syncEditors);
        this.editor.addEventListener('change', this.syncEditors);
        this.editor.addEventListener('paste', this.syncEditors);
        this.resizeEnable();

        this.element.appendChild(this.editor);

        this.setSize({
            width: this.props.minWidth!,
            height: this.props.minHeight!,
        });

        return this.element;
    }

    resizeEnable() {
        if (this.props.resizable) {
            this.resizeManager = new Resizable(this.element, {
                className: styles.resizer,
                onResize: this.setSize
            });
        }
    }

    resizeDisable() {
        if (this.resizeManager) {
            this.resizeManager.destroy();
        }
    }

    disable() {
        this.destroy();

        this.element.replaceChild(this.editorStatic, this.editor);
    }

    enable() {
        this.resizeEnable();

        this.element.replaceChild(this.editor, this.editorStatic);
    }


    destroy() {
        this.resizeDisable();
    }

    setSize = (size: Size) => {
        this.size = {
            width: Math.max(Math.min(size.width, this.props.maxWidth || Infinity), this.props.minWidth!),
            height: Math.max(Math.min(size.height, this.props.maxHeight || Infinity), this.props.minHeight!)
        };

        this.editor.style.width = `${this.size.width}px`;
        this.editor.style.height = `${this.size.height}px`;

        this.editorStatic.style.width = `${this.size.width}px`;
        this.editorStatic.style.height = `${this.size.height}px`;
    }
}
