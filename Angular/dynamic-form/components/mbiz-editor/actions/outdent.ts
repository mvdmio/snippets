import { EditorAction } from './interface/editor-action';
import { EditorUtils } from '../utils/editor-utils';

export class OutdentEditorAction extends EditorAction {
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
            this.isActive = false;
        }
    }

    public isKeybindingPressed(event: KeyboardEvent): boolean {
        return event.shiftKey && event.key === 'Tab';
    }

    protected onExecute(): void {
        EditorUtils.executeCommand('outdent');
    };
}