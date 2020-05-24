import {Component} from '../Component';
import {Resizable} from "../libs/Resizable";
import {IComponent} from "../Component";

interface Size {
    width: number
    height: number
}

export interface StickyContentProps {
    // contentComponent: Component<{}>
    resizable?: boolean
}

export interface IStickyContent<P> extends IComponent<P> {
    destroy(): void

    setSize(size: Size): void

    toString(): string
}

export class StickyContent<P extends StickyContentProps> extends Component<P> implements IStickyContent<P> {
    protected resizeManager?: Resizable;
    protected content?: HTMLElement;

    public destroy() {
        if (this.props.resizable && this.resizeManager) {
            this.resizeManager.destroy();
        }
    }

    private setSize(size: Size) {
        this.content.style.width = `${size.width}px`;
        this.content.style.height = `${size.height}px`;
    }

    render() {
        this.content = this.props.contentComponent.render();

        if (this.props.resizable) {
            this.resizeManager = new Resizable(this.content, {
                onResize: (size): void => this.setSize(size)
            });
        }
        return this.content;
    }
}
