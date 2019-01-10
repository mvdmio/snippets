import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-switch-input',
    templateUrl: './mbiz-switch-input.component.html',
    styleUrls: ['./mbiz-switch-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizSwitchInputComponent),
        }
    ]
})
export class MbizSwitchInputComponent extends MbizFormInputBase {
    @Input('label')
    public label?: string;
    
    public constructor() {
        super();
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
