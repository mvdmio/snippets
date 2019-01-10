import { EditorAction } from './interface/editor-action';
import { EditorUtils } from '../utils/editor-utils';
import { MbizEditorCreateLinkModalComponent } from '../modals/create-link/mbiz-editor-create-link-modal.component';
import { CreateLinkModel } from '../models/create-link.model';

export class LinkEditorAction extends EditorAction {
    private readonly _linkModal: MbizEditorCreateLinkModalComponent;

    private selection: Selection;
    private previousSelection: Array<Range>;

    constructor(contentElement: HTMLElement, linkModal: MbizEditorCreateLinkModalComponent) {
        super(contentElement);

        this._linkModal = linkModal;

        this._linkModal.onClose.subscribe(
            () => {
                if (this.previousSelection) {
                    EditorUtils.setSelectionRanges(this.previousSelection);
                    this.previousSelection = null;
                }
                this._contentElement.focus();
            }
        );

        this._linkModal.onSubmit.subscribe(
            (createLinkModel: CreateLinkModel) => {
                if (this.previousSelection) {
                    EditorUtils.setSelectionRanges(this.previousSelection);
                    this.previousSelection = null;
                }
                
                EditorUtils.executeCommand('createLink', createLinkModel.url);

                var anchorElement = EditorUtils.getElementFromSelection(this.selection, HTMLAnchorElement);
                anchorElement.text = createLinkModel.text;

                this._contentElement.focus();
            }
        );
    }

    public updateState(): void {
        const selection = EditorUtils.getSelection();

        if (selection.rangeCount === 0) {
            this.isDisabled = true;
            this.isActive = false;
        } 
        else {
            this.isDisabled = false;
            this.isActive = !!EditorUtils.getElementFromSelection(selection, HTMLAnchorElement);
        }
    }

    public isKeybindingPressed(event: KeyboardEvent): boolean {
        return event.ctrlKey && event.key === 'u';
    }

    protected onExecute(): void {
        this.selection = EditorUtils.getSelection();

        const anchorElement = EditorUtils.getElementFromSelection(this.selection, HTMLAnchorElement);
        if (anchorElement) {
            this.selection.selectAllChildren(anchorElement);
        }
        
        this.previousSelection = EditorUtils.getSelectionRanges(this.selection);

        if (anchorElement) {
            this._linkModal.open(this.selection.toString(), anchorElement.href);
        } 
        else {
            this._linkModal.open(this.selection.toString(), null);
        }
    };
}