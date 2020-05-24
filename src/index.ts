import {StickyNotes} from "./StickyNotes";

(<any>window).StickyNotes = function (container: Element | string) {
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
        const stickyNotesComponent = new StickyNotes({
            container: containerNode,
            contentOptions: {
                resizable: false
            },
            options: {
                position: () => {
                    return {
                        top: 10,
                        left: 10
                    }
                }
            }
        });

        stickyNotesComponent.render();
        console.log(stickyNotesComponent);
    }
};
