import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-textarea-input',
    templateUrl: './mbiz-textarea-input.component.html',
    styleUrls: ['./mbiz-textarea-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizTextareaInputComponent),
        }
    ]
})
export class MbizTextareaInputComponent extends MbizFormInputBase {
    @Input()
    public label: string;

    public constructor() {
        super();
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
