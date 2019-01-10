import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-date-input',
    templateUrl: './mbiz-date-input.component.html',
    styleUrls: ['./mbiz-date-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizDateInputComponent),
        }
    ]
})
export class MbizDateInputComponent extends MbizFormInputBase {
    private _inputValue: Date;

    @Input('label')
    public label: string;
    
    @Input('inline')
    public inline: boolean;

    public get inputValue(): Date {
        return this._inputValue;
    }

    public set inputValue(value: Date) {
        this._inputValue = value;
        this.control.setValue(value);
    }

    public constructor() {
        super();
    }

    protected onInit(): void {
        this._inputValue = new Date(this.control.value);
        
        this.control.valueChanges.subscribe(
            newValue => {
                this._inputValue = new Date(newValue);
            }
        );
    }

    protected onDestroy(): void {
    }
}
