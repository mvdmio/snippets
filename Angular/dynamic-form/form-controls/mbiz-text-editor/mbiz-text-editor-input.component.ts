import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '@mbiz/form/controls';

@Component({
    selector: 'mbiz-text-editor-input',
    templateUrl: './mbiz-text-editor-input.component.html',
    styleUrls: ['./mbiz-text-editor-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizTextEditorInputComponent),
        }
    ]
})
export class MbizTextEditorInputComponent extends MbizFormInputBase {
    @Input('label')
    public label: string;

    @Input('inline')
    public inline: boolean;

    public constructor() {
        super();
    }

    protected onInit(): void {
    }
    
    protected onDestroy(): void {
    }
}
