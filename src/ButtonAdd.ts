import {Component} from "./Component";


export interface IButtonAddProps {
    content: string,
    className: string,

    onClick?(): Boolean | void
}

const defaultProps:IButtonAddProps = {
    content: 'Add sticker',
    className: '',
};

export class ButtonAdd<P extends IButtonAddProps> extends Component<P> {

    render() {
        const buttonNode = document.createElement('button');
        buttonNode.type = 'button';
        buttonNode.innerHTML = this.props.content || defaultProps.content;
        buttonNode.className = this.props.className || defaultProps.className;

        if(this.props.onClick)
        buttonNode.addEventListener('click', this.props.onClick);

        return buttonNode;
    }
}
