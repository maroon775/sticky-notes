import {CreateStickyOptions, StickyNotes as StickyNotesComponent} from "./StickyNotes";
import {Textarea} from "./StickyContent/Textarea";
import {IStickyItemProps, StickyElement, StickyItem} from "./StickyItem";
import * as config from "../config.json";


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
            getStickersContent: () => component.stickers.map(item => item.content.toString()),
            getStickers: ():StickyItem<IStickyItemProps>[] => component.stickers,
            removeStickers: () => component.stickers.forEach(item=> item.destroy()),
            createSticker: (options: CreateStickyOptions): StickyItem<IStickyItemProps>  => {
                return component.createSticky(options);
            },
            getStyleString: () => {
                const styleNode = document.querySelector<HTMLStyleElement>('style#' + config.styleTagId);
                if(styleNode)
                {
                    return styleNode.innerText;
                }
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
