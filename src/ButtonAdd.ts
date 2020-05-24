import {Component} from './Component';
import * as styles from './ButtonAdd.less';


export interface IButtonAddProps {
    content: string,
    className?: string,

    onClick?(event: MouseEvent): Boolean | void
}

const defaultProps: IButtonAddProps = {
    content: 'Add sticker',
    className: '',
};


export class ButtonAdd<P extends IButtonAddProps> extends Component<P> {

    render(): HTMLButtonElement {
        const buttonNode = document.createElement('button');
        buttonNode.type = 'button';
        buttonNode.innerHTML = this.props.content || defaultProps.content;
        buttonNode.className = [styles.ButtonAdd, (this.props.className || defaultProps.className)].join(' ');


        buttonNode.addEventListener('click', this.onClick);
        return buttonNode;
    }

    private onClick = (event: MouseEvent) => {
        if (this.props.onClick) {
            return this.props.onClick(event);
        }
    }
}
