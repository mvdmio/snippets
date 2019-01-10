import { EditorAction } from './interface/editor-action';
import { EditorUtils } from '../utils/editor-utils';

export class FormatBlockEditorAction extends EditorAction {
    private readonly _tag: string;

    constructor(contentElement: HTMLElement, tag: string) {
        super(contentElement);
        this._tag = tag;
    }

    public updateState(): void {
        const selection = EditorUtils.getSelection();

        if (selection.rangeCount === 0) {
            this.isDisabled = true;
            this.isActive = false;
        }
        else {
            this.isDisabled = false;
            this.isActive = EditorUtils.queryCommandValue('formatblock') === this._tag;
        }
    }

    public isKeybindingPressed(event: KeyboardEvent): boolean {
        return false;
    }

    protected onExecute(): void {
        EditorUtils.executeCommand('formatblock', this._tag);
    };
}