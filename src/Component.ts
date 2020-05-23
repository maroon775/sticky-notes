export type RenderType = Element | null | undefined | void;
export type Props = {
    [propertyName: string]: any
};

export interface IComponent<P extends Props> {
    props?: P

    render(): RenderType

    [propertyName: string]: any
}

export class Component<P extends {}> implements IComponent<P> {
    constructor(public props :P) {}

    render(): RenderType {
        throw new Error('Method render should be implemented');
    }
}
