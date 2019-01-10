import { EditorAction } from './interface/editor-action';
import { EditorUtils } from '../utils/editor-utils';

export class ItalicEditorAction extends EditorAction {
    constructor(contentElement: HTMLElement) {
        super(contentElement);
    }

    public updateState(): void {
        const selection = EditorUtils.getSelection();

        if (selection.rangeCount === 0) {
            this.isDisabled = true;
            this.isActive = false;
        }
        else {
            this.isDisabled = false;
            this.isActive = EditorUtils.queryCommandState('italic');
        }
    }

    public isKeybindingPressed(event: KeyboardEvent): boolean {
        return event.ctrlKey && event.key === 'i';
    }

    protected onExecute(): void {
        EditorUtils.executeCommand('italic');
    };
}