import {CreateStickyOptions, StickyNotes as StickyNotesComponent} from "./StickyNotes";
import {Textarea} from "./StickyContent/Textarea";
import {IStickyItemProps, StickyItem} from "./StickyItem";


(<any>window).StickyNotes = function (container: Element | string) {
    let containerNode: HTMLElement;

    if (typeof container === 'string') {
        containerNode = document.querySelector<HTMLElement>(container)!;
    } else {
        if (container instanceof HTMLElement) {
            containerNode = container;
        } else {
            throw new Error('First argument of container is not valid.')
        }
    }

    if (containerNode) {
        const component = new StickyNotesComponent(containerNode);


        return {
            disableStickers: () => component.stickers.forEach(item=> item.disable()),
            enableStickers: () => component.stickers.forEach(item=> item.enable()),
            getStickers: () => component.stickers.map(item => item.content.toString()),
            createSticker: (options: CreateStickyOptions): StickyItem<IStickyItemProps>  => {
                return component.createSticky(options);
            }
        }
    }
};

(<any>window).StickyNotes.Components = {
    content: {
        Textarea
    },
    StickyItem
};
