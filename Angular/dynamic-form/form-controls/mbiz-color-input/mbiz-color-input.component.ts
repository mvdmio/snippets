import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorPicker } from 'primeng/colorpicker';

import { MbizFormInputBase } from '../mbiz-form-input-base';

@Component({
    selector: 'mbiz-color-input',
    templateUrl: './mbiz-color-input.component.html',
    styleUrls: ['./mbiz-color-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizColorInputComponent),
        }
    ]
})
export class MbizColorInputComponent extends MbizFormInputBase {
    private _inputValue;

    @Input('label')
    public label: string;
    
    @Input('inline')
    public inline: boolean;

    @Input('useOverlay')
    public useOverlay: boolean = false;

    @ViewChild(ColorPicker)
    public colorPicker: ColorPicker;

    public get colorValue(): string  {
        return this._inputValue;
    }

    public set colorValue(value: string) {
        if (!value.startsWith('#')) {
            value = `#${value}`;
        }

        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (hexColorRegex.test(value)) {
            this.control.setValue(value);
        }
    }

    public constructor() {
        super();
    }

    protected onInit(): void {
        this.control.valueChanges.subscribe(
            newValue => {
                this._inputValue = newValue;
            }
        );
    }

    protected onDestroy(): void {
    }
}
