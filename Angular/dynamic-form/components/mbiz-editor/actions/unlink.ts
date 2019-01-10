import { EditorAction } from './interface/editor-action';
import { EditorUtils } from '../utils/editor-utils';

export class UnlinkEditorAction extends EditorAction {
    constructor(contentElement: HTMLElement) {
        super(contentElement);
    }

    public updateState(): void {
        const selection = EditorUtils.getSelection();

        if (selection.rangeCount === 0) {
            this.isDisabled = true;
        }
        else {
            const anchorElement = EditorUtils.getElementFromSelection(selection, HTMLAnchorElement);

            if (anchorElement) {
                this.isDisabled = false;
            }
            else {
                this.isDisabled = true;
            }
        }
    }

    public isKeybindingPressed(event: KeyboardEvent): boolean {
        return event.ctrlKey && event.key === 'u';
    }

    protected onExecute(): void {
        const selection = EditorUtils.getSelection();

        const anchorElement = EditorUtils.getElementFromSelection(selection, HTMLAnchorElement);
        if (anchorElement) {
            //'Unlink' command only works if the whole anchor is highlighted.
            selection.selectAllChildren(anchorElement);
            EditorUtils.executeCommand('unlink');
        }
    };
}