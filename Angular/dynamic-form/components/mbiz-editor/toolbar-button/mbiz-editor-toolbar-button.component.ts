import { Component, Input } from '@angular/core';
import { EditorAction } from '@mbiz/form/components/mbiz-editor/actions/interface/editor-action';

@Component({
    selector: 'mbiz-editor-toolbar-button',
    templateUrl: './mbiz-editor-toolbar-button.component.html',
    styleUrls: ['./mbiz-editor-toolbar-button.component.css']
})
export class MbizEditorToolbarButtonComponent {
    @Input('shape')
    public shape: string;

    @Input('title')
    public title: string;

    @Input('action')
    public action: EditorAction;

    public onClick(): void {
        this.action.execute();
    }
}
