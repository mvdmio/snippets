import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

import * as _ from 'lodash';

@Component({
    selector: 'mbiz-select-input',
    templateUrl: './mbiz-select-input.component.html',
    styleUrls: ['./mbiz-select-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizSelectInputComponent),
        }
    ]
})
export class MbizSelectInputComponent extends MbizFormInputBase {
    @Input('label')
    public label: string;

    @Input('inline')
    public inline: boolean;

    public constructor() {
        super();
    }

    public compareFn(t1: any, t2: any) {
        return t1 && t2 && (t1 === t2 || _.isEqual(t1, t2));
    }

    protected onInit(): void {
    }

    protected onDestroy(): void {
    }
}
