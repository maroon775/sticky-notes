import {Component} from "./Component";

import {ButtonAdd, IButtonAddProps} from './ButtonAdd';
import {IStickyItemProps, StickyItem} from "./StickyItem";
import {ButtonsBar} from "./ButtonsBar";
import {Textarea} from "./StickyContent/Textarea";
import {StickyContentProps} from "./StickyContent/StickyContent";
import {Position} from "./interfaces";

type Button = ButtonAdd<IButtonAddProps>;

export interface IStickyNotesProps {
    container: Element
    options?: {
        position?: Position | (() => Position)
    }
    contentOptions: StickyContentProps
}

export interface IStickyNotes {
    button: Button;
    buttonsBar: ButtonsBar<{ buttons: [Button] }>
    stickers: StickyItem<IStickyItemProps>[]

    createButton(): void

    createSticky(): void
}

export class StickyNotes<P extends IStickyNotesProps> extends Component<P> implements IStickyNotes {
    public button!: Button;
    public buttonsBar!: ButtonsBar<{ buttons: [Button] }>;
    public stickers: StickyItem<IStickyItemProps>[];

    constructor(props: P) {
        super(props);

        this.stickers = [];
    }

    createButton(): void {
        this.button = new ButtonAdd({
            content: 'ADD NOTE',
            onClick: this.createSticky.bind(this)
        });
    }

    createButtonsBar() {
        this.buttonsBar = new ButtonsBar({
            buttons: [this.button]
        });
        const buttonsBarElement = this.buttonsBar.render();
        if (buttonsBarElement) {
            const body = document.querySelector('body')!;
            body.appendChild(buttonsBarElement)
        }
    }

    onStickerRemove(id: number) {
        this.stickers = this.stickers.filter(item => item.id !== id);
    }

    createSticky(): void {
        const stickyItemProps: IStickyItemProps = {
            index: (this.stickers.length) + 1,
            contentComponent: new Textarea(this.props.contentOptions),
            onRemove: this.onStickerRemove.bind(this),
        };
        if (this.props.options && this.props.options.position) {
            if (typeof this.props.options.position === 'function') {
                stickyItemProps.position = this.props.options.position();
            } else {
                stickyItemProps.position = {
                    top: this.props.options.position.top || 0,
                    left: this.props.options.position.left || 0
                };
            }
        }
        const sticky = new StickyItem(stickyItemProps);
        sticky.render();

        if (sticky.element) {
            this.props.container.prepend(sticky.element);
            this.stickers.push(sticky);
        }
    }

    render() {
        this.createButton();
        this.createButtonsBar();
        return null;
    }
}





