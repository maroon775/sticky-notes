import {Component} from "./Component";

import {ButtonAdd, IButtonAddProps} from './ButtonAdd';
import {IStickyProps, StickyItem} from "./StickyItem";
import {ButtonsBar} from "./ButtonsBar";
import {Textarea} from "./StickyContent/Textarea";

type Button = ButtonAdd<IButtonAddProps>;

export interface IStickyNotesProps {
    container: Element
}

export interface IStickyNotes {
    button: Button;
    buttonsBar: ButtonsBar<{ buttons: [Button] }>
    stickers: StickyItem<IStickyProps>[]

    createButton(): void

    createSticky(): void
}

export class StickyNotes<P extends IStickyNotesProps> extends Component<P> implements IStickyNotes {
    public button!: Button;
    public buttonsBar!: ButtonsBar<{ buttons: [Button] }>;
    public stickers: StickyItem<IStickyProps>[];

    constructor(props: P) {
        super(props);

        this.stickers = [];
    }

    createButton(): void {
        this.button = new ButtonAdd({
            className: 'sticky-notes__buttonCreate',
            content: 'Add note',
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
        const sticky = new StickyItem({
            index: ( this.stickers.length ) + 1,
            contentComponent: new Textarea({}),
            position: {
                top: 300,
                left: (300*( this.stickers.length) + 20)
            },
            size: {
                width: 250,
                height: 200
            },
            onRemove: this.onStickerRemove.bind(this)
        });
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





