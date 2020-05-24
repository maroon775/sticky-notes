export type RenderType = HTMLElement | null | undefined | void;
export type Props = {
    [propertyName: string]: any
};

export interface IComponent<P extends Props> {
    props?: P

    render(): RenderType

    [propertyName: string]: any
}

export class Component<P extends {}> implements IComponent<P> {
    public props: P;

    constructor(props: P) {
        const defaultProps = Object.getPrototypeOf(this).constructor.defaultProps;
        this.props = defaultProps ? {...defaultProps, ...props} : props;
        console.log(this.props, defaultProps);
    }

    render(): RenderType {
        throw new Error('Method render should be implemented');
    }
}
