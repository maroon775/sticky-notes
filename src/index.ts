import {StickyNotes as StickyNotesComponent} from "./StickyNotes";
import {Position} from "./interfaces";
import {StickyContentProps} from "./StickyContent/StickyContent";

interface StickyNotesOptions {
    options?: {
        position?: Position | (() => Position)
    }
    contentOptions: StickyContentProps
}

(<any>window).StickyNotes = function (container: Element | string, options: StickyNotesOptions) {
    let containerNode: Element;

    if (typeof container === 'string') {
        containerNode = document.querySelector(container)!;
    } else {
        if (container instanceof Element) {
            containerNode = container;
        } else {
            throw new Error('First argument of container is not valid.')
        }
    }

    if (containerNode) {
        const component = new StickyNotesComponent({
            container: containerNode,
            ...options
        });

        component.render();

        return {
            disableStickers: () => component.stickers.forEach(item=> item.disable()),
            enableStickers: () => component.stickers.forEach(item=> item.enable()),
            getStickers: () => component.stickers.map(item => item.content.toString())
        }
    }
};
