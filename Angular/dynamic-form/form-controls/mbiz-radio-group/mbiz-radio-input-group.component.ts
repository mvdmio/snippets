import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-radio-input-group',
    templateUrl: './mbiz-radio-input-group.component.html',
    styleUrls: ['./mbiz-radio-input-group.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizRadioInputGroupComponent),
        }
    ]
})
export class MbizRadioInputGroupComponent extends MbizFormInputBase {
    @Input('label')
    public label: string;

    public constructor() {
        super();
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
