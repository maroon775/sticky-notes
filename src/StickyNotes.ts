import {IStickyItemProps, StickyItem} from "./StickyItem";
import {IStickyContent, StickyContentProps} from "./StickyContent/StickyContent";
import {Position} from "./interfaces";


export interface CreateStickyOptions {
    contentComponent: IStickyContent<StickyContentProps>
    position?: Position
    startIndex?: number
}

export interface IStickyNotes {
    container: HTMLElement
    stickers: StickyItem<IStickyItemProps>[]
    createSticky(options: CreateStickyOptions): StickyItem<IStickyItemProps>
}

export class StickyNotes implements IStickyNotes {
    public stickers: StickyItem<IStickyItemProps>[] = [];

    constructor(public container: HTMLElement) {
        this.container.className ='sticky-notes';
        this.container.style.position ='relative';
    }
    onStickerRemove(id: number) {
        this.stickers = this.stickers.filter(item => item.id !== id);
    }

    public createSticky(options: CreateStickyOptions): StickyItem<IStickyItemProps> {
        const stickyItemProps: IStickyItemProps = {
            ...options,
            index: (this.stickers.length) + (options.startIndex || 0) + 1,
            onRemove: this.onStickerRemove.bind(this)
        };

        const sticky = new StickyItem(stickyItemProps);
        sticky.render();

        if (sticky.element) {
            this.container.prepend(sticky.element);
            this.stickers.push(sticky);
        }
        return sticky;
    }
}





