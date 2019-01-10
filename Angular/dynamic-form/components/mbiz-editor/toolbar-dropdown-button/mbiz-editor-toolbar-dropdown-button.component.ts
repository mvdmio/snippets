import { Component, Input } from '@angular/core';
import { EditorAction } from '@mbiz/form/components/mbiz-editor/actions/interface/editor-action';

@Component({
    selector: 'mbiz-editor-toolbar-dropdown-button',
    templateUrl: './mbiz-editor-toolbar-dropdown-button.component.html',
    styleUrls: ['./mbiz-editor-toolbar-dropdown-button.component.css']
})
export class MbizEditorToolbarDropdownButtonComponent {
    @Input('title')
    public title: string;

    @Input('action')
    public action: EditorAction;

    public onClick(): void {
        this.action.execute();
    }
}
