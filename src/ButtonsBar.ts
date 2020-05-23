import {Component} from "./Component";


interface ButtonsProps {
    buttons: Component<{}>[]
}


export class ButtonsBar<P extends ButtonsProps> extends Component<P> {
    render() {
        const buttonsBar = document.createElement('div');
        buttonsBar.className = 'sticky-notes__buttons-bar';

        if (this.props.buttons.length > 0) {
            this.props.buttons.forEach(component => {

                const componentNode = component.render();

                if(componentNode) {
                    buttonsBar.appendChild(componentNode);
                }

            });
        }


        return buttonsBar;
    }
}
