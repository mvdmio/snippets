import { Component, Input, Host, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { MbizComponentBase } from '@mbiz/shared';

import { MbizRadioInputGroupComponent } from '../mbiz-radio-group/mbiz-radio-input-group.component';

@Component({
    selector: 'mbiz-radio-input',
    templateUrl: './mbiz-radio-input.component.html',
    styleUrls: ['./mbiz-radio-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizRadioInputComponent)
        }
    ]
})
export class MbizRadioInputComponent extends MbizComponentBase {
    private static nextId: number = 0;

    private readonly _id: number;
    private readonly _radioGroup: MbizRadioInputGroupComponent;

    @Input('label')
    public label: string;

    @Input('value')
    public value: any;

    public get id(): string {
        return `radio-input-${this._id}`;
    }

    public get control(): FormControl {
        if (!this._radioGroup.control)
            throw new Error('Control is not set on the <mbiz-radio-input-group> component');

        return this._radioGroup.control;
    }

    public constructor(@Host() radioGroup: MbizRadioInputGroupComponent) {
        super();

        this._id = MbizRadioInputComponent.nextId++;
        this._radioGroup = radioGroup;

        if (!this._radioGroup)
            throw new Error('<mbiz-radio-input> must be embedded in a <mbiz-radio-input-group> component');
    }

    protected onInit(): void {
  
    }

    protected onDestroy(): void {
    }
}
