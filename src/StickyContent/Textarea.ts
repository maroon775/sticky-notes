import {Component} from "../Component";

export class Textarea<P = {}> extends Component<P> {
    render() {
        const content = document.createElement('div');
        const editor = document.createElement('textarea');
        content.appendChild(editor);

        return content;
    }
}
