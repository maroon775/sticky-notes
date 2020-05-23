export type RenderType = Element | null | undefined;
export type ComponentProps = {
    [propertyName: string]: any
};

export interface IComponent<P extends ComponentProps> {
    props: P

    render(): RenderType

    [propertyName: string]: any
}

export class Component<P> implements IComponent<P> {
    props: P;

    constructor(props?: Readonly<P>);

    render(): RenderType;
}
